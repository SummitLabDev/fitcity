import clsx from 'clsx';
import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';

const MembershipSelector = ({ plans, selectedId, onSelect }) => {
  const prefersReducedMotion = useReducedMotion();

  const formatPrice = (value) => `€${value.toFixed(2).replace('.', ',')}`;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {plans.map((plan, index) => {
        const isSelected = selectedId === plan.id;

        return (
          <motion.button
            key={plan.id}
            type="button"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 0.3, delay: index * 0.05 }
            }
            onClick={() => onSelect(plan.id)}
            className={clsx(
              'relative flex flex-col rounded-2xl border p-5 text-left transition-all duration-200',
              isSelected
                ? 'border-fitcity bg-fitcity/10 ring-2 ring-fitcity'
                : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]'
            )}
          >
            {/* Selection indicator */}
            <div
              className={clsx(
                'absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full transition-all duration-200',
                isSelected ? 'bg-fitcity' : 'border border-white/30'
              )}
            >
              {isSelected && (
                <Check className="h-4 w-4 text-night" strokeWidth={3} />
              )}
            </div>

            {/* Popular badge */}
            {plan.mostPopular && (
              <span className="mb-3 inline-flex w-fit rounded-full bg-fitcity px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider text-night">
                Populair
              </span>
            )}

            {/* Plan name */}
            <h3 className="pr-8 font-display text-lg">{plan.name}</h3>

            {/* Description */}
            {plan.description && (
              <p className="mt-1 text-sm text-white/60">{plan.description}</p>
            )}

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-1.5">
              <span className="font-display text-2xl text-fitcity">
                {formatPrice(plan.price)}
              </span>
              <span className="text-sm text-white/50">/ {plan.period}</span>
            </div>

            {/* Contract length */}
            {plan.contractMonths && plan.contractMonths > 1 && (
              <p className="mt-2 text-xs text-white/40">
                {plan.contractMonths} maanden looptijd
              </p>
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default MembershipSelector;
