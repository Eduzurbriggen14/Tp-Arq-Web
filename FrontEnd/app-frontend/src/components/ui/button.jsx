import React from 'react';

const Button = ({ onClick, className = '', children, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        py-2 px-4 rounded-md font-medium focus:outline-none transition 
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;