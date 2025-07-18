import React from 'react';

const Button = ({ onClick, children }) => (
  <button onClick={onClick} data-testid="custom-button">
    {children}
  </button>
);

export default Button; 