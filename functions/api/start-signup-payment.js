// POST /api/start-signup-payment
// Creates a new signup and Mollie payment, returns checkout URL

import { validateSignupInput, normalizePostalCode, normalizePhone } from '../_lib/validation.js';
import { createPayment, formatMollieAmount } from '../_lib/mollie.js';
import { createSignup, updateSignupMolliePaymentId } from '../_lib/db.js';
import { getMembershipById, isSignupEligible } from '../_lib/memberships.js';

const REGISTRATION_FEE = 17;

export async function onRequestPost(context) {
  const { request, env } = context;

  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    // Parse request body
    const data = await request.json();

    // Validate input
    const validation = validateSignupInput(data);
    if (!validation.valid) {
      return new Response(JSON.stringify({ error: validation.errors[0], errors: validation.errors }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Verify membership is eligible for online signup
    if (!isSignupEligible(data.membershipId)) {
      return new Response(JSON.stringify({ error: 'Dit abonnement kan niet online worden afgesloten' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Get membership details
    const membership = getMembershipById(data.membershipId);
    if (!membership) {
      return new Response(JSON.stringify({ error: 'Ongeldig abonnement' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    // Generate unique signup ID
    const signupId = crypto.randomUUID();

    // Create signup record in database
    const signup = {
      id: signupId,
      createdAt: new Date().toISOString(),
      status: 'pending',
      membershipId: membership.id,
      membershipName: membership.name,
      membershipPrice: membership.price.toString(),
      membershipTerm: membership.period,
      startDate: data.startDate,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      email: data.email.toLowerCase().trim(),
      phone: normalizePhone(data.phone),
      dateOfBirth: data.dateOfBirth,
      street: data.street.trim(),
      houseNumber: data.houseNumber.trim(),
      houseNumberAddition: data.houseNumberAddition?.trim() || '',
      postalCode: normalizePostalCode(data.postalCode),
      city: data.city.trim(),
    };

    await createSignup(env.DB, signup);

    // Create Mollie payment
    const webhookToken = env.MOLLIE_WEBHOOK_TOKEN;
    const baseUrl = env.APP_BASE_URL;

    const payment = await createPayment(env.MOLLIE_API_KEY, {
      amount: formatMollieAmount(REGISTRATION_FEE),
      description: `FitCity inschrijfkosten – ${membership.name}`,
      redirectUrl: `${baseUrl}/bedankt?signup=${signupId}`,
      webhookUrl: `${baseUrl}/api/mollie-webhook?token=${webhookToken}`,
      metadata: {
        signupId: signupId,
      },
    });

    // Update signup with Mollie payment ID
    await updateSignupMolliePaymentId(env.DB, signupId, payment.id);

    // Return checkout URL
    return new Response(JSON.stringify({
      checkoutUrl: payment._links.checkout.href,
      signupId: signupId,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });

  } catch (error) {
    console.error('Error creating signup payment:', error);

    return new Response(JSON.stringify({
      error: 'Er is een fout opgetreden. Probeer het later opnieuw.',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}

// Handle CORS preflight
export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
