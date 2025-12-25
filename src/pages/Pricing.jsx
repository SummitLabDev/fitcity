import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import Section from '../components/Section';
import PlanCard from '../components/PlanCard';
import { additionalServices, oneTimeFees, planGroups } from '../data/memberships';
import { useLocation } from 'react-router-dom';

const faqItems = [
  {
    question: 'Zijn er inschrijfkosten?',
    answer: 'Ja, eenmalig €17,00 bij de start van je lidmaatschap. De eerste incasso gebeurt op de startdatum die je kiest.',
  },
  {
    question: 'Hoe betaal ik het abonnement?',
    answer: 'Standaard via maandelijkse automatische incasso op je gekozen startdatum. Pin of contante betaling bij de balie kan ook.',
  },
  {
    question: 'Wat is de contractduur en opzegtermijn?',
    answer: 'Flex is maandelijks opzegbaar. 6/12-maanden lidmaatschappen lopen door tot het einde van de termijn en verlengen daarna voor dezelfde periode; na verlenging geldt een opzegtermijn van 1 maand.',
  },
  {
    question: 'Worden prijzen tussentijds aangepast?',
    answer: 'Prijswijzigingen worden minimaal een maand vooraf aangekondigd en worden niet tijdens je lopende contracttermijn doorgevoerd.',
  },
];

const Pricing = () => {
  const location = useLocation();
  const [activeGroup, setActiveGroup] = useState(planGroups[0]?.key ?? '');
  const currentGroup = useMemo(
    () => planGroups.find((group) => group.key === activeGroup) ?? planGroups[0],
    [activeGroup]
  );
  const formatPrice = (value) => `€ ${value.toFixed(2).replace('.', ',')}`;

  useEffect(() => {
    if (!location.hash) return;
    const hashKey = location.hash.replace('#', '');
    if (planGroups.some((group) => group.key === hashKey)) {
      setActiveGroup(hashKey);
    }
  }, [location.hash]);

  return (
    <>
      <Section
        tone="contrast"
        header={{
          eyebrow: 'Kies jouw membership',
          title: currentGroup?.label ?? 'Abonnementen',
          subtitle: currentGroup?.description ?? 'Kies het lidmaatschap dat past bij jouw doelen.',
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
          {currentGroup?.plans?.map((plan) => (
            <PlanCard key={plan.name} plan={plan} isMostPopular={Boolean(plan.mostPopular)} />
          ))}
        </div>
      </Section>

      <Section
        tone="overlay"
        header={{ eyebrow: 'Extra', title: 'Aanvullende diensten en eenmalige kosten' }}
        contentClassName="grid gap-6 lg:grid-cols-2"
      >
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-fitcity">Aanvullende diensten</p>
          {additionalServices.map((service) => (
            <div
              key={service.name}
              className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="text-xl font-display">{service.name}</h3>
                <p className="text-sm text-white/70">{service.description}</p>
              </div>
              <p className="text-3xl font-display text-fitcity">{formatPrice(service.price)}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-fitcity">Eenmalige kosten</p>
          {oneTimeFees.map((option) => (
            <div
              key={option.name}
              className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <h3 className="text-xl font-display">{option.name}</h3>
                <p className="text-sm text-white/70">{option.description}</p>
              </div>
              <p className="text-3xl font-display text-fitcity">{formatPrice(option.price)}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        tone="panel"
        header={{
          eyebrow: 'FAQ',
          title: 'Prijzen en lidmaatschap',
          subtitle: 'Helder over incasso, contractduur en voorwaarden.',
        }}
        contentClassName="grid gap-4 md:grid-cols-2"
      >
        {faqItems.map((item) => (
          <div
            key={item.question}
            className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 text-left"
          >
            <h3 className="text-lg font-display text-white">{item.question}</h3>
            <p className="mt-2 text-sm text-white/70">{item.answer}</p>
          </div>
        ))}
      </Section>
    </>
  );
};

export default Pricing;
