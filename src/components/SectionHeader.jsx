import clsx from 'clsx';

const SectionHeader = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  kicker,
  className = '',
}) => {
  if (!eyebrow && !title && !subtitle && !kicker) return null;

  return (
    <div
      className={clsx(
        'space-y-4',
        align === 'center' ? 'text-center mx-auto max-w-3xl' : 'text-left'
        ,
        className
      )}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-fitcity/90">
          <span className="h-px w-6 bg-fitcity/60" aria-hidden />
          {eyebrow}
        </div>
      )}
      {title && (
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-balance">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="text-base sm:text-lg text-white/70">
          {subtitle}
        </p>
      )}
      {kicker && (
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-white/50">
          {kicker}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
