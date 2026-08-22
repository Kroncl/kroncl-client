'use client';

import clsx from 'clsx';
import styles from './input.module.scss';
import { InputHTMLAttributes, forwardRef } from 'react';

export type InputVariant = 'default' | 'green' | 'light' | 'leader' | 'contrast' | 'elevated' | 'empty' | 'glass' | 'brand' | 'accent';
export type InputBorder = 'default' | 'round' | 'none';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  fullWidth?: boolean;
  label?: string | false;
  border?: InputBorder;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      variant = 'default',
      error = false,
      fullWidth = false,
      label = false,
      className,
      border = 'default',
      ...props
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        className={clsx(
          styles.input,
          styles[variant],
          styles[size],
          { [styles.fullWidth]: fullWidth },
          className,
          border === 'round' && styles.round,
          border === 'none' && styles.borderNone
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;