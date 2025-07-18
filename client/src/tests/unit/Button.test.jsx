// Button.test.jsx - Unit test for Button component

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '../../components/Button';

describe('Button', () => {
  it('renders children', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    const { getByTestId } = render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(getByTestId('custom-button'));
    expect(handleClick).toHaveBeenCalled();
  });
}); 