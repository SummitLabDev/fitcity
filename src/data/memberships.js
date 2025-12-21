const plans = [
  {
    id: 'smart-deal',
    name: 'Smart Deal',
    price: 24.5,
    period: 'maand',
    description: '12 maanden onbeperkt fitness.',
    features: ['12 maanden contract', 'Onbeperkt fitness'],
    contractMonths: 12,
    includesKickboxing: false,
    isLadiesOnly: false,
    mostPopular: true,
  },
  {
    id: 'fit-deal',
    name: 'Fit Deal',
    price: 29.5,
    period: 'maand',
    description: '6 maanden onbeperkt fitness.',
    features: ['6 maanden contract', 'Onbeperkt fitness'],
    contractMonths: 6,
    includesKickboxing: false,
    isLadiesOnly: false,
  },
  {
    id: 'combi-deal',
    name: 'Combi Deal (kickboksen + fitness)',
    price: 39.5,
    period: 'maand',
    description: '12 maanden fitness + kickboksen.',
    features: ['12 maanden contract', 'Kickboksen inbegrepen', 'Onbeperkt sport'],
    contractMonths: 12,
    includesKickboxing: true,
    isLadiesOnly: false,
  },
  {
    id: 'ladies-jaar-deal',
    name: 'Ladies Jaar Deal',
    price: 20.5,
    period: 'maand',
    description: 'Exclusieve toegang tot de ladies only zone.',
    features: ['12 maanden onbeperkt sporten', 'Ladies only + fitness'],
    contractMonths: 12,
    includesKickboxing: false,
    isLadiesOnly: true,
    mostPopular: true,
  },
  {
    id: 'ladies-halfjaar',
    name: 'Ladies Halfjaar',
    price: 25.5,
    period: 'maand',
    description: 'Ideaal als je flexibiliteit zoekt met voordeel.',
    features: ['6 maanden onbeperkt sporten', 'Ladies only + fitness'],
    contractMonths: 6,
    includesKickboxing: false,
    isLadiesOnly: true,
  },
  {
    id: 'ladies-flex',
    name: 'Ladies Flex',
    price: 32,
    period: 'maand',
    description: 'Maandelijks opzegbaar en inclusief ladies only + fitness.',
    features: ['Flexibel contract', 'Ladies only + fitness', 'Maandelijks opzegbaar'],
    contractMonths: 1,
    includesKickboxing: false,
    isLadiesOnly: true,
  },
  {
    id: 'maand-flex',
    name: 'Maand Flex',
    price: 37,
    period: 'maand',
    description: 'Vrijheid zonder langere verplichting.',
    features: ['Maandelijks opzegbaar', 'Onbeperkt sporten'],
    contractMonths: 1,
    includesKickboxing: false,
    isLadiesOnly: false,
  },
  {
    id: 'quick-deal-3mnd',
    name: 'Quick Deal (3 mnd)',
    price: 99,
    description: 'Eenmalige betaling voor 3 maanden sporten.',
    features: ['3 maanden toegang', 'Ideaal voor kickstart'],
    contractMonths: 3,
    includesKickboxing: false,
    isLadiesOnly: false,
  },
  {
    id: 'dagpas',
    name: 'Dagpas',
    price: 7,
    description: 'Probeer Fitcity een hele dag uit.',
    features: ['Alle faciliteiten op 1 dag'],
    includesKickboxing: false,
    isLadiesOnly: false,
  },
];

const planLookup = plans.reduce((acc, plan) => {
  acc[plan.id] = plan;
  return acc;
}, {});

const planGroups = [
  {
    key: 'fitness',
    label: 'All-in Fitness',
    description: 'Onbeperkt fitness (contract of flexibel)',
    plans: ['smart-deal', 'fit-deal', 'combi-deal'].map((id) => planLookup[id]),
  },
  {
    key: 'ladies',
    label: 'Ladies Only',
    description: 'Exclusieve memberships voor vrouwen',
    plans: ['ladies-jaar-deal', 'ladies-halfjaar', 'ladies-flex'].map((id) => planLookup[id]),
  },
  {
    key: 'flex',
    label: 'Flex & Add-ons',
    description: 'Korte termijn en aanvullende opties',
    plans: ['maand-flex', 'quick-deal-3mnd', 'dagpas'].map((id) => planLookup[id]),
  },
];

const homeMembershipTeasers = ['smart-deal', 'ladies-jaar-deal', 'combi-deal'].map((id) => planLookup[id]);

const ladiesOnlyPlans = ['ladies-jaar-deal', 'ladies-halfjaar', 'ladies-flex'].map((id) => planLookup[id]);

const otherPricingOptions = [{ name: 'Inschrijfkosten', price: 17, description: 'Eenmalig bij start nieuw lidmaatschap.' }];

export {
  plans,
  planGroups,
  homeMembershipTeasers,
  ladiesOnlyPlans,
  otherPricingOptions,
};
