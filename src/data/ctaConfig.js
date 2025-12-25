const primaryCta = {
  label: 'Plan proefles',
  href: '/contact#proefles',
  trackingId: 'cta-primary',
  contextualLabels: {
    ladiesOnly: 'Plan proefles',
    kickboxing: 'Plan proefles',
  },
};

const getPrimaryCta = (context) => ({
  ...primaryCta,
  label: primaryCta.contextualLabels?.[context] ?? primaryCta.label,
});

const ctaButtonClassName = 'w-full justify-center sm:w-auto';

export { primaryCta, getPrimaryCta, ctaButtonClassName };
