// Membership data for backend validation
// This mirrors the frontend data in src/data/memberships.js

export const plans = [
  {
    id: 'smart-deal',
    name: 'Smart Deal',
    price: 24.5,
    period: 'maand',
    contractMonths: 12,
    signupEligible: true,
  },
  {
    id: 'duo-deal',
    name: 'Combi Deal',
    price: 39.5,
    period: 'maand',
    contractMonths: 12,
    signupEligible: true,
  },
  {
    id: 'ladies-jaar-deal',
    name: 'Ladies Only Jaar',
    price: 20.5,
    period: 'maand',
    contractMonths: 12,
    signupEligible: true,
  },
  {
    id: 'ultimate-fit',
    name: 'Ultimate Fit Deal',
    price: 37.5,
    period: 'maand',
    contractMonths: 12,
    signupEligible: true,
  },
  {
    id: 'kickboxing-weekly',
    name: 'Kickboksen 1x p/w',
    price: 19.95,
    period: 'maand',
    contractMonths: 12,
    signupEligible: true,
  },
  {
    id: 'kickboxing-unlimited',
    name: 'Kickboksen Onbeperkt',
    price: 26.95,
    period: 'maand',
    contractMonths: 12,
    signupEligible: true,
  },
  {
    id: 'fit-deal-halfjaar',
    name: 'Fit Deal (6 mnd)',
    price: 29.5,
    period: 'maand',
    contractMonths: 6,
    signupEligible: true,
  },
  {
    id: 'ladies-halfjaar',
    name: 'Ladies Halfjaar',
    price: 25.5,
    period: 'maand',
    contractMonths: 6,
    signupEligible: true,
  },
  {
    id: 'quick-deal-3mnd',
    name: 'Quick Deal (3 mnd)',
    price: 99,
    period: '3 maanden (eenmalig)',
    contractMonths: 3,
    signupEligible: false, // One-time payment, not recurring
  },
  {
    id: 'maand-flex',
    name: 'Maand Flex',
    price: 37,
    period: 'maand',
    contractMonths: 1,
    signupEligible: true,
  },
  {
    id: 'ladies-flex',
    name: 'Ladies Flex',
    price: 32,
    period: 'maand',
    contractMonths: 1,
    signupEligible: true,
  },
  {
    id: 'dagpas',
    name: 'Dagpas',
    price: 7,
    period: 'dag',
    signupEligible: false, // Day pass, not a subscription
  },
];

export const planLookup = plans.reduce((acc, plan) => {
  acc[plan.id] = plan;
  return acc;
}, {});

export function getMembershipById(id) {
  return planLookup[id] || null;
}

export function isSignupEligible(id) {
  const plan = planLookup[id];
  return plan ? plan.signupEligible : false;
}
