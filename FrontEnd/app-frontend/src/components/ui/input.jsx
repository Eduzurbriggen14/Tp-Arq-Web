import React from 'react';

const Input = ({ placeholder, type = 'text', value, onChange }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        padding: '10px',
        margin: '10px 0',
        borderRadius: '5px',
        border: '1px solid #ccc',
      }}
    />
  );
};

export default Input;
