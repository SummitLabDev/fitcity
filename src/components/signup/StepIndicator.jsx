import clsx from 'clsx';
import { Check } from 'lucide-react';

const steps = [
  { number: 1, label: 'Abonnement' },
  { number: 2, label: 'Startdatum' },
  { number: 3, label: 'Gegevens' },
];

const StepIndicator = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.number;
        const isCurrent = currentStep === step.number;

        return (
          <div key={step.number} className="flex items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2">
              <div
                className={clsx(
                  'flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all duration-200',
                  isCompleted && 'bg-fitcity text-night',
                  isCurrent && 'bg-fitcity text-night ring-4 ring-fitcity/30',
                  !isCompleted && !isCurrent && 'bg-white/10 text-white/50'
                )}
              >
                {isCompleted ? (
                  <Check className="h-4 w-4" strokeWidth={3} />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={clsx(
                  'hidden text-sm font-medium sm:block',
                  isCurrent ? 'text-white' : 'text-white/50'
                )}
              >
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={clsx(
                  'h-px w-8 sm:w-12',
                  currentStep > step.number ? 'bg-fitcity' : 'bg-white/20'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepIndicator;
