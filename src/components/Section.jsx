import clsx from 'clsx';
import Container from './Container';
import Reveal from './Reveal';
import SectionHeader from './SectionHeader';

const toneStyles = {
  base: '',
  overlay: 'bg-charcoal/70 border-y border-white/5',
  contrast: 'bg-gradient-to-b from-charcoal to-night/80',
  panel: 'relative isolate bg-white/[0.02] border-y border-white/5',
};

const paddingStyles = {
  none: 'py-0',
  tight: 'py-12 md:py-16',
  base: 'py-16 md:py-24',
};

const Section = ({
  children,
  className = '',
  contentClassName = '',
  containerClassName = '',
  header,
  tone = 'base',
  padding = 'base',
  disableReveal = false,
  id,
}) => {
  const toneClass = toneStyles[tone] ?? toneStyles.base;
  const paddingClass = paddingStyles[padding] ?? paddingStyles.base;

  const content = disableReveal ? (
    <div className={contentClassName}>{children}</div>
  ) : (
    <Reveal className={contentClassName}>{children}</Reveal>
  );

  return (
    <section id={id} className={clsx(paddingClass, toneClass, className)}>
      <Container className={containerClassName}>
        {header && <SectionHeader {...header} />}
        <div className={clsx(header ? 'mt-12' : '')}>{content}</div>
      </Container>
    </section>
  );
};

export default Section;
