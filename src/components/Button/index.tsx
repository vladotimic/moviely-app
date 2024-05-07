import React from 'react';
import classNames from 'classnames';
import './Button.css';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  isActive?: boolean;
}

function Button({ children, isActive = false, ...rest }: ButtonProps) {
  const className = classNames('button', { 'button--active': isActive });

  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
}

export default Button;
