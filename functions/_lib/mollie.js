// Mollie API wrapper for payment operations

const MOLLIE_API_BASE = 'https://api.mollie.com/v2';

export async function createPayment(apiKey, options) {
  const response = await fetch(`${MOLLIE_API_BASE}/payments`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: {
        currency: 'EUR',
        value: options.amount, // e.g., "17.00"
      },
      description: options.description,
      redirectUrl: options.redirectUrl,
      webhookUrl: options.webhookUrl,
      metadata: options.metadata,
      method: 'ideal', // Only iDEAL for now
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Mollie API error: ${error.detail || error.title || 'Unknown error'}`);
  }

  return response.json();
}

export async function getPayment(apiKey, paymentId) {
  const response = await fetch(`${MOLLIE_API_BASE}/payments/${paymentId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Mollie API error: ${error.detail || error.title || 'Unknown error'}`);
  }

  return response.json();
}

export async function createCustomer(apiKey, options) {
  const response = await fetch(`${MOLLIE_API_BASE}/customers`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: options.name,
      email: options.email,
      metadata: options.metadata,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Mollie API error: ${error.detail || error.title || 'Unknown error'}`);
  }

  return response.json();
}

export async function createSubscription(apiKey, customerId, options) {
  const response = await fetch(`${MOLLIE_API_BASE}/customers/${customerId}/subscriptions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: {
        currency: 'EUR',
        value: options.amount, // e.g., "24.50"
      },
      interval: options.interval, // e.g., "1 month"
      description: options.description,
      startDate: options.startDate, // YYYY-MM-DD format
      webhookUrl: options.webhookUrl,
      metadata: options.metadata,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`Mollie API error: ${error.detail || error.title || 'Unknown error'}`);
  }

  return response.json();
}

// Helper to format price for Mollie (e.g., 17 -> "17.00")
export function formatMollieAmount(amount) {
  return amount.toFixed(2);
}
