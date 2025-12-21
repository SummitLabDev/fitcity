import { useMemo, useState } from 'react';
import clsx from 'clsx';
import Section from '../components/Section';
import PlanCard from '../components/PlanCard';
import { planGroups, otherPricingOptions } from '../data/memberships';

const Pricing = () => {
  const [activeGroup, setActiveGroup] = useState('fitness');
  const currentGroup = useMemo(() => planGroups.find((group) => group.key === activeGroup) ?? planGroups[0], [activeGroup]);

  return (
    <>
      <Section
        tone="contrast"
        header={{
          eyebrow: 'Kies jouw membership',
          title: currentGroup.label,
          subtitle: currentGroup.description,
        }}
        contentClassName="space-y-8"
        disableReveal
      >
        <div className="flex flex-wrap gap-3">
          {planGroups.map((group) => (
            <button
              key={group.key}
              type="button"
              onClick={() => setActiveGroup(group.key)}
              className={clsx(
                'rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition',
                activeGroup === group.key ? 'border-fitcity text-fitcity' : 'border-white/10 text-white/60 hover:text-white'
              )}
            >
              {group.label}
            </button>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
          {currentGroup.plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} isMostPopular={Boolean(plan.mostPopular)} />
          ))}
        </div>
      </Section>

      <Section
        tone="overlay"
        header={{ eyebrow: 'Belangrijk', title: 'Eenmalige kosten bij inschrijving' }}
        contentClassName="space-y-4"
      >
        {otherPricingOptions.map((option) => (
          <div
            key={option.name}
            className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h3 className="text-xl font-display">{option.name}</h3>
              <p className="text-sm text-white/70">{option.description}</p>
            </div>
            <p className="text-3xl font-display text-fitcity">€{option.price.toFixed(2).replace('.', ',')}</p>
          </div>
        ))}
      </Section>
    </>
  );
};

export default Pricing;
