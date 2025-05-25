// src/components/ui/card.js
import React from 'react';

const Card = ({ children, title }) => {
  return (
    <div
      style={{
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        marginBottom: '20px',
      }}
    >
      {title && <h3>{title}</h3>}
      <div>{children}</div>
    </div>
  );
};

const CardContent = ({ children }) => {
  return (
    <div
      style={{
        padding: '10px 0',
        borderTop: '1px solid #ddd',
        marginTop: '10px',
      }}
    >
      {children}
    </div>
  );
};

// Export both components
export { Card, CardContent };
