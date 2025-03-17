import React, { ReactNode } from 'react';

interface FormButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  disabled?: boolean;
  fullWidth?: boolean;
}

const FormButton: React.FC<FormButtonProps> = ({
  type = 'button',
  onClick,
  children,
  className = '',
  variant = 'primary',
  disabled = false,
  fullWidth = false,
}) => {
  const baseClasses = 'px-4 py-2 rounded-lg flex items-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-700 to-blue-600 text-white hover:from-blue-600 hover:to-blue-500 focus:ring-blue-500',
    secondary: 'bg-blue-900 text-white hover:bg-blue-800 focus:ring-blue-500',
    danger: disabled 
      ? 'bg-red-700/50 text-white cursor-not-allowed' 
      : 'bg-red-700 text-white hover:bg-red-800 focus:ring-red-500',
    success: 'bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-500 hover:to-green-400 focus:ring-green-500',
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default FormButton; 