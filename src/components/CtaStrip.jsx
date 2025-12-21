import clsx from 'clsx';
import { Link } from 'react-router-dom';
import Section from './Section';
import Button from './ui/Button';
import { ctaButtonClassName } from '../data/ctaConfig';

const CtaStrip = ({
  eyebrow,
  title,
  copy,
  primaryCta,
  secondaryCta,
  tone = 'overlay',
  padding = 'tight',
  className,
}) => {
  return (
    <Section tone={tone} padding={padding} disableReveal>
      <div
        className={clsx(
          'flex flex-col gap-6 rounded-4xl border border-white/10 bg-gradient-to-r from-charcoal via-charcoal to-night/80 p-10 text-center lg:flex-row lg:items-center lg:text-left',
          className
        )}
      >
        <div className="flex-1">
          {eyebrow && <p className="text-xs uppercase tracking-[0.4em] text-fitcity">{eyebrow}</p>}
          <h2 className="mt-3 text-3xl font-display">{title}</h2>
          {copy && <p className="mt-2 text-white/70">{copy}</p>}
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            as={Link}
            to={primaryCta.href}
            size="lg"
            className={ctaButtonClassName}
            data-tracking-id={primaryCta.trackingId}
          >
            {primaryCta.label}
          </Button>
          {secondaryCta && (
            <Button
              as={Link}
              to={secondaryCta.href}
              size="lg"
              variant={secondaryCta.variant ?? 'ghost'}
              className={ctaButtonClassName}
              data-tracking-id={secondaryCta.trackingId}
            >
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </div>
    </Section>
  );
};

export default CtaStrip;
