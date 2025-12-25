import clsx from 'clsx';
import { Check } from 'lucide-react';

const Checkbox = ({
  label,
  checked,
  onChange,
  error,
  className = '',
  id,
  children,
  ...props
}) => {
  const checkboxId = id || props.name;

  return (
    <div className={clsx('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={checkboxId}
        className="flex cursor-pointer items-start gap-3"
      >
        <div className="relative mt-0.5 flex-shrink-0">
          <input
            id={checkboxId}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="sr-only"
            {...props}
          />
          <div
            className={clsx(
              'flex h-5 w-5 items-center justify-center rounded-md border transition-all duration-200',
              checked
                ? 'border-fitcity bg-fitcity'
                : 'border-white/30 bg-white/5 hover:border-white/50',
              error && !checked && 'border-red-500/60'
            )}
          >
            {checked && (
              <Check className="h-3.5 w-3.5 text-night" strokeWidth={3} />
            )}
          </div>
        </div>
        <span className="text-sm text-white/80 leading-relaxed">
          {children || label}
        </span>
      </label>
      {error && (
        <p className="text-sm text-red-400 ml-8">{error}</p>
      )}
    </div>
  );
};

export default Checkbox;
