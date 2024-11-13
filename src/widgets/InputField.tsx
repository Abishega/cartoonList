import React from 'react';

interface InputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder: string;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  onKeyDown,
  placeholder,
  className = ''
}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      style={{ height: '4rem' }}  
      className={`px-6 py-3 rounded-xl text-lg font-semibold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-white transform transition-all duration-300 ease-in-out hover:scale-105 w-full sm:w-auto ${className}`}
    />
  );
};

export default InputField;

