import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  text: string;
  link?: string;
  onClick?: () => void;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string; 
}

const Button: React.FC<ButtonProps> = ({ text, link, onClick, disabled = false, fullWidth = false, className = '' }) => {
  const buttonClasses = `
    px-8 py-3 text-white font-semibold text-xl rounded-full shadow-lg
    transition-all duration-300 transform ease-in-out hover:scale-105
    ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 hover:shadow-2xl'}
    ${fullWidth ? 'w-full' : ''} ${className} block
  `;

  const buttonStyle = {
    height: '3rem',    
    minHeight: '3rem'  
  };

  // If `link` prop is provided, render as a link
  if (link) {
    return (
      <Link href={link}>
        <span className={buttonClasses} style={buttonStyle}>
          {text}
        </span>
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      style={buttonStyle}
    >
      {text}
    </button>
  );
};

export default Button;
