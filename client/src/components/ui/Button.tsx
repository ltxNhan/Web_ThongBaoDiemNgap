import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  style,
  ...props
}) => {
  const baseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: 600,
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: 'none',
    width: fullWidth ? '100%' : 'auto',
    fontFamily: 'inherit',
    ...style
  };

  const sizeStyles = {
    sm: { padding: '6px 12px', fontSize: '0.85rem' },
    md: { padding: '10px 18px', fontSize: '0.95rem' },
    lg: { padding: '14px 24px', fontSize: '1.05rem' }
  };

  const variantStyles = {
    primary: {
      background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
      color: '#ffffff',
      boxShadow: '0 4px 12px rgba(2, 132, 199, 0.35)'
    },
    secondary: {
      backgroundColor: '#1f2d5a',
      color: '#e2e8f0',
      border: '1px solid #2d417e'
    },
    danger: {
      background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
      color: '#ffffff',
      boxShadow: '0 4px 12px rgba(239, 68, 68, 0.35)'
    },
    outline: {
      backgroundColor: 'transparent',
      border: '1px solid #38bdf8',
      color: '#38bdf8'
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#94a3b8'
    }
  };

  return (
    <button
      style={{
        ...baseStyle,
        ...sizeStyles[size],
        ...variantStyles[variant]
      }}
      {...props}
    >
      {children}
    </button>
  );
};
