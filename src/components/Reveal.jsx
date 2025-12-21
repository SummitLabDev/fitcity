import { motion, useInView, useAnimation, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';

const Reveal = ({ children, className = '', width = '100%' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const mainControls = useAnimation();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      mainControls.start('visible');
      return;
    }

    if (isInView) {
      mainControls.start('visible');
    }
  }, [isInView, mainControls, prefersReducedMotion]);

  return (
    <div ref={ref} style={{ position: 'relative', width, overflow: 'hidden' }}>
      <motion.div
        className={className}
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial={prefersReducedMotion ? 'visible' : 'hidden'}
        animate={mainControls}
        transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : 0.15 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Reveal;
