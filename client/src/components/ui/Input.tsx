import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({ label, error, icon, style, ...props }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
      {label && (
        <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#cbd5e1' }}>
          {label}
        </label>
      )}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {icon && (
          <div style={{ position: 'absolute', left: '12px', color: '#64748b', display: 'flex' }}>
            {icon}
          </div>
        )}
        <input
          style={{
            width: '100%',
            padding: icon ? '10px 14px 10px 40px' : '10px 14px',
            backgroundColor: '#0f172a',
            border: error ? '1px solid #ef4444' : '1px solid #1e293b',
            borderRadius: '8px',
            color: '#f8fafc',
            fontSize: '0.95rem',
            outline: 'none',
            fontFamily: 'inherit',
            transition: 'border-color 0.2s ease',
            ...style
          }}
          {...props}
        />
      </div>
      {error && <span style={{ fontSize: '0.75rem', color: '#f87171' }}>{error}</span>}
    </div>
  );
};
