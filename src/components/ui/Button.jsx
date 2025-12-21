import clsx from 'clsx';

const variants = {
  primary:
    'bg-fitcity text-night shadow-glow hover:bg-[#ffef66] focus-visible:ring-2 focus-visible:ring-fitcity/60',
  secondary:
    'border border-white/30 text-white hover:border-fitcity/60 hover:text-fitcity focus-visible:ring-2 focus-visible:ring-white/40',
  ghost:
    'text-white/70 hover:text-white hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-white/30',
};

const sizes = {
  sm: 'text-sm px-4 py-2 rounded-full',
  md: 'text-base px-6 py-3 rounded-full',
  lg: 'text-lg px-7 py-4 rounded-full',
};

const Button = ({
  as: Component = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  icon: Icon,
  iconPosition = 'right',
  ...props
}) => {
  const iconMarkup = Icon ? <Icon className="h-5 w-5" aria-hidden /> : null;

  return (
    <Component
      className={clsx(
        'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {iconMarkup && iconPosition === 'left' && iconMarkup}
      {children}
      {iconMarkup && iconPosition === 'right' && iconMarkup}
    </Component>
  );
};

export default Button;
