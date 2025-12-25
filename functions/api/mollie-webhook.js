// POST /api/mollie-webhook
// Handles Mollie payment status updates

import { getPayment, createCustomer, createSubscription, formatMollieAmount } from '../_lib/mollie.js';
import { getSignupById, getSignupByMolliePaymentId, updateSignupStatus, updateSignupEmailSent, updateSignupSubscription } from '../_lib/db.js';
import { sendSignupConfirmation } from '../_lib/email.js';

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    // Validate webhook token
    const url = new URL(request.url);
    const token = url.searchParams.get('token');

    if (token !== env.MOLLIE_WEBHOOK_TOKEN) {
      console.error('Invalid webhook token');
      return new Response('Unauthorized', { status: 401 });
    }

    // Parse payment ID from request body
    // Mollie sends either JSON or form-urlencoded
    let paymentId;
    const contentType = request.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const body = await request.json();
      paymentId = body.id;
    } else {
      // Form-urlencoded: id=tr_xxxxx
      const body = await request.text();
      const params = new URLSearchParams(body);
      paymentId = params.get('id');
    }

    if (!paymentId) {
      console.error('No payment ID in webhook');
      return new Response('Bad Request', { status: 400 });
    }

    // Get payment details from Mollie
    const payment = await getPayment(env.MOLLIE_API_KEY, paymentId);

    // Find signup by payment ID or metadata
    let signup = await getSignupByMolliePaymentId(env.DB, paymentId);

    if (!signup && payment.metadata?.signupId) {
      signup = await getSignupById(env.DB, payment.metadata.signupId);
    }

    if (!signup) {
      console.error('Signup not found for payment:', paymentId);
      return new Response('OK', { status: 200 }); // Return 200 to prevent Mollie retries
    }

    // Process based on payment status
    switch (payment.status) {
      case 'paid':
        await handlePaidPayment(env, signup);
        break;

      case 'canceled':
        await updateSignupStatus(env.DB, signup.id, 'canceled');
        break;

      case 'failed':
        await updateSignupStatus(env.DB, signup.id, 'failed');
        break;

      case 'expired':
        await updateSignupStatus(env.DB, signup.id, 'expired');
        break;

      default:
        // Other statuses (open, pending) - no action needed
        break;
    }

    return new Response('OK', { status: 200 });

  } catch (error) {
    console.error('Webhook error:', error);
    // Return 200 to prevent retries for unrecoverable errors
    return new Response('OK', { status: 200 });
  }
}

async function handlePaidPayment(env, signup) {
  // Check if already processed (idempotency)
  if (signup.status === 'paid' || signup.status === 'subscription_created') {
    console.log('Payment already processed for signup:', signup.id);
    return;
  }

  // Update status to paid
  await updateSignupStatus(env.DB, signup.id, 'paid');

  // Send confirmation email if not already sent
  if (!signup.emailSentAt) {
    try {
      await sendSignupConfirmation(env.RESEND_API_KEY, env.EMAIL_FROM, signup);
      await updateSignupEmailSent(env.DB, signup.id);
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
      // Don't fail the webhook - email can be resent manually
    }
  }

  // Create SEPA subscription if enabled
  if (env.ENABLE_SEPA === 'true') {
    try {
      await createSepaSubscription(env, signup);
    } catch (error) {
      console.error('Failed to create SEPA subscription:', error);
      // Don't fail the webhook - subscription can be created manually
    }
  }
}

async function createSepaSubscription(env, signup) {
  // Create Mollie customer
  const customer = await createCustomer(env.MOLLIE_API_KEY, {
    name: `${signup.firstName} ${signup.lastName}`,
    email: signup.email,
    metadata: {
      signupId: signup.id,
    },
  });

  // Create subscription starting from the signup start date
  const subscription = await createSubscription(env.MOLLIE_API_KEY, customer.id, {
    amount: formatMollieAmount(parseFloat(signup.membershipPrice)),
    interval: '1 month',
    description: `FitCity ${signup.membershipName}`,
    startDate: signup.startDate,
    webhookUrl: `${env.APP_BASE_URL}/api/mollie-webhook?token=${env.MOLLIE_WEBHOOK_TOKEN}`,
    metadata: {
      signupId: signup.id,
    },
  });

  // Update signup with subscription details
  await updateSignupSubscription(env.DB, signup.id, customer.id, subscription.id);
}
