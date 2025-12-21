import {
  plans,
  planGroups,
  homeMembershipTeasers,
  ladiesOnlyPlans,
  otherPricingOptions,
} from '../src/data/memberships.js';

const errors = [];

const requiredPlanFields = ['id', 'name', 'price', 'description', 'features'];
const planIds = new Set();

plans.forEach((plan) => {
  requiredPlanFields.forEach((field) => {
    if (plan[field] === undefined || plan[field] === null || plan[field] === '') {
      errors.push(`Plan "${plan.name ?? 'unknown'}" is missing required field "${field}".`);
    }
  });

  if (typeof plan.price !== 'number' || Number.isNaN(plan.price)) {
    errors.push(`Plan "${plan.name ?? plan.id}" has invalid price.`);
  }

  if (!Array.isArray(plan.features) || plan.features.length === 0) {
    errors.push(`Plan "${plan.name ?? plan.id}" must include at least one feature.`);
  }

  if (planIds.has(plan.id)) {
    errors.push(`Duplicate plan id "${plan.id}" found.`);
  }
  planIds.add(plan.id);
});

const referencedPlans = [
  ...planGroups.flatMap((group) => group.plans),
  ...homeMembershipTeasers,
  ...ladiesOnlyPlans,
];

referencedPlans.forEach((plan) => {
  if (!plan || !plan.id || !planIds.has(plan.id)) {
    errors.push('A referenced plan is missing from the master list.');
  }
});

otherPricingOptions.forEach((option) => {
  if (!option.name || typeof option.price !== 'number') {
    errors.push('Each other pricing option must include a name and numeric price.');
  }
});

if (errors.length > 0) {
  console.error('Membership data validation failed:\n');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('Membership data validation passed.');
