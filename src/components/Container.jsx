import clsx from 'clsx';

const Container = ({ as: Component = 'div', className = '', children }) => {
  return (
    <Component className={clsx('mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-10', className)}>
      {children}
    </Component>
  );
};

export default Container;
