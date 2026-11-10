import React from 'react';

interface DatePickerProps {
  label?: string;
  value: string;
  onChange: (val: string) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ label, value, onChange }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {label && <label style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>{label}</label>}
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: '8px 12px',
          backgroundColor: '#070f24',
          border: '1px solid #1e3a8a',
          borderRadius: '8px',
          color: '#f8fafc',
          fontSize: '0.85rem',
          outline: 'none'
        }}
      />
    </div>
  );
};
