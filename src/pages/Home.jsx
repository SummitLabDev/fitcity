import { Link } from 'react-router-dom';
import { Dumbbell, Sparkles, Shield, Activity, Star } from 'lucide-react';
import Hero from '../components/Hero';
import Section from '../components/Section';
import PlanCard from '../components/PlanCard';
import Button from '../components/ui/Button';
import CtaStrip from '../components/CtaStrip';
import { homeMembershipTeasers } from '../data/memberships';
import { primaryCta } from '../data/ctaConfig';

const valueProps = [
  {
    icon: Dumbbell,
    title: 'Goede apparatuur',
    copy: 'Cardio en kracht van TechnoGym, Nautilus, SportsArt en meer.',
  },
  {
    icon: Sparkles,
    title: 'Ruimte voor iedereen',
    copy: 'Van starters tot gevorderden - laagdrempelig en vriendelijk.',
  },
  {
    icon: Shield,
    title: 'Hulp op de vloer',
    copy: 'Altijd iemand aanwezig voor vragen of een tip bij je training.',
  },
  {
    icon: Activity,
    title: 'Kickboksen',
    copy: 'Lessen voor kids en volwassenen, te combineren met fitness.',
  },
];

const socialStats = [
  { label: 'Rating', value: '4.6/5' },
  { label: 'Parkeren', value: 'Gratis' },
  { label: 'Only zone', value: 'Ladies' },
];

const kickboxingCards = [
  { image: '/kickboxing.webp', title: '(Kick)Boksen', description: 'Techniek, conditie en sparren in kleine groepen.' },
  { image: '/kinderkickboksen.jpg', title: 'Kinderkickboksen', description: 'Speelse lessen met focus op zelfvertrouwen.' },
];

const kickboxingSchedule = [
  { label: 'Volwassenen', detail: 'Avondlessen op ma/wo/vr + zaterdagochtend' },
  { label: 'Intro & techniek', detail: 'Regelmatig ingepland, aanmelden via app of balie' },
  { label: 'Kids', detail: 'Woensdag & zaterdag slots, niveaus per leeftijd' },
  { label: 'Combi deal', detail: 'Kickboksen is inbegrepen bij Combi memberships' },
];

const Home = () => {
  return (
    <>
      <Hero />

      <Section
        header={{
          eyebrow: 'Omgeving',
          title: 'Een moderne, warme club voor elke fase van jouw fitnessreis',
          subtitle: '',
          align: 'left',
        }}
        contentClassName="grid gap-12 lg:grid-cols-2"
      >
        <div className="space-y-6">
          <p className="text-white/70">
            Fitness, ladies only zone en (kick)boksen onder 1 dak. Onze crew helpt je graag verder op de vloer.
          </p>
          <ul className="space-y-4 text-white/70">
            {[
              'Cardio & kracht: TechnoGym, Nautilus, SportsArt e.a.',
              'Flexibele abonnementen zonder kleine lettertjes',
              'Kickboksen voor kids en volwassenen',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-fitcity/20 text-fitcity" aria-hidden="true">›</span>
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button as={Link} to="/abonnementen">
              Bekijk abonnementen
            </Button>
            <Button as={Link} to={primaryCta.href} variant="ghost" data-tracking-id={primaryCta.trackingId}>
              {primaryCta.label}
            </Button>
          </div>
        </div>
        <div className="overflow-hidden rounded-3xl border border-white/10">
          <img
            src="/fitcity_groepsles.webp"
            alt="Sfeerimpressie groepsles"
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      </Section>

      <Section
        header={{
          eyebrow: 'Waarom Fitcity',
          title: 'Toegankelijk, persoonlijk en altijd in beweging',
          align: 'left',
        }}
        contentClassName="grid gap-6 md:grid-cols-3 lg:grid-cols-4"
      >
        {valueProps.map(({ icon: Icon, title, copy }) => (
          <div key={title} className="rounded-3xl border border-white/10 bg-white/[0.02] p-6">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-fitcity/15 text-fitcity">
              <Icon size={22} />
            </div>
            <h3 className="text-xl font-display">{title}</h3>
            <p className="mt-2 text-sm text-white/70">{copy}</p>
          </div>
        ))}
      </Section>

      <Section
        tone="contrast"
        header={{
          eyebrow: 'Abonnementen',
          title: 'Flexibele memberships zonder kleine lettertjes',
          subtitle: 'Kies het lidmaatschap dat past bij jouw doelen en gewenste commitment.',
        }}
        contentClassName="grid gap-6 md:grid-cols-3 lg:grid-cols-3"
        disableReveal
      >
        {homeMembershipTeasers.map((plan) => (
          <PlanCard key={plan.name} plan={plan} isMostPopular={false} />
        ))}
        <Button as={Link} to="/abonnementen" variant="ghost" className="md:col-span-3 lg:col-span-3 justify-center">
          Bekijk alle abonnementen
        </Button>
      </Section>

      <Section
        header={{
          eyebrow: 'Community',
          title: 'Samen fit worden en blijven',
          subtitle: 'We bouwen aan een inclusieve community waar iedereen zich gezien voelt.',
        }}
        contentClassName="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]"
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 text-center">
            <p className="text-2xl font-display">{socialStats[0].value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.3em] text-white/50">{socialStats[0].label}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 text-center">
            <p className="text-2xl font-display">{socialStats[2].value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.3em] text-white/50">{socialStats[2].label}</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 text-center sm:col-span-2">
            <p className="text-2xl font-display">{socialStats[1].value}</p>
            <p className="mt-1 text-xs uppercase tracking-[0.3em] text-white/50">{socialStats[1].label}</p>
          </div>
        </div>
        <div className="space-y-6 rounded-4xl border border-white/10 bg-white/[0.02] p-8">
          <div className="flex items-center gap-3 text-fitcity">
            <Star size={20} />
            <p className="text-sm font-semibold uppercase tracking-[0.3em]">Reviews</p>
          </div>
          <p className="text-lg text-white/80">
            Fijne sportschool met een mooie, roze womens only afdeling. Hier staat voldoende apparatuur voor een goede workout.
          </p>
          <div>
            <p className="font-semibold">Vienna</p>
            <p className="text-sm text-white/50">5/5 Google review</p>
          </div>
        </div>
      </Section>

      <Section
        tone="panel"
        header={{
          eyebrow: '(Kick)Boksen',
          title: 'Rooster en opties in een oogopslag',
          subtitle: 'Combi memberships geven toegang tot alle (kick)bokstrainingen.',
        }}
        contentClassName="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]"
      >
        <div className="grid gap-6 sm:grid-cols-2">
          {kickboxingCards.map((item) => (
            <div key={item.title} className="group relative overflow-hidden rounded-4xl border border-white/10">
              <img src={item.image} alt={item.title} className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-2xl font-display">{item.title}</h3>
                <p className="text-sm text-white/80">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-4 rounded-4xl border border-white/10 bg-white/[0.02] p-6">
          <p className="text-xs uppercase tracking-[0.4em] text-fitcity">Rooster highlights</p>
          <div className="space-y-3 text-sm text-white/70">
            {kickboxingSchedule.map((slot) => (
              <div key={slot.label} className="rounded-2xl border border-white/5 bg-white/[0.02] px-4 py-3">
                <p className="font-semibold text-white">{slot.label}</p>
                <p className="text-white/70">{slot.detail}</p>
              </div>
            ))}
          </div>
          <Button as={Link} to="/contact" variant="ghost" className="w-full justify-center">
            Vraag naar het actuele rooster
          </Button>
        </div>
      </Section>

      <CtaStrip
        eyebrow="Start vandaag"
        title="Plan een gratis proefles"
        copy="Probeer de gym en krijg een korte rondleiding."
        primaryCta={primaryCta}
      />
    </>
  );
};

export default Home;
