import React from 'react';

interface FilterOption {
  label: string;
  value: string;
}

interface FilterDropdownProps {
  label?: string;
  options: FilterOption[];
  selectedValue: string;
  onChange: (val: string) => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  label,
  options,
  selectedValue,
  onChange
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
      {label && <label style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600 }}>{label}</label>}
      <select
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: '8px 12px',
          backgroundColor: '#070f24',
          border: '1px solid #1e3a8a',
          borderRadius: '8px',
          color: '#f8fafc',
          fontSize: '0.85rem',
          outline: 'none',
          cursor: 'pointer'
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} style={{ backgroundColor: '#0c1630', color: '#ffffff' }}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};
