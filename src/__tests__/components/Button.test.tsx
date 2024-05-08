import { render, screen } from '@testing-library/react';

import Button from '@/components/Button';

describe('Button Component', () => {
  it('should be in the document', () => {
    render(<Button>Click me</Button>);

    const buttonElement = screen.getByText(/click me/i);

    expect(buttonElement).toBeInTheDocument();
  });

  it('should have .button--active class if it is selected', () => {
    render(<Button isActive>Click me</Button>);

    const buttonElement = screen.getByText(/click me/i);

    expect(buttonElement).toHaveClass('button--active');
  });
});
