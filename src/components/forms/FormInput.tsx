import React from 'react';

interface FormInputProps {
  label: string;
  type: 'text' | 'number' | 'date';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  step?: string;
  required?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  className = '',
  step,
  required = false,
}) => {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        step={step}
        required={required}
      />
    </div>
  );
};

export default FormInput; 