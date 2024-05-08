import { render, screen } from '@testing-library/react';
import BrokenImage from '@/components/BrokenImage';

describe('BrokenImage Component', () => {
  it('should be in the document', () => {
    render(<BrokenImage />);

    const element = screen.getByTitle(/broken image/i);

    expect(element).toBeInTheDocument();
  });

  it('should have .broken__image--cover class', () => {
    render(<BrokenImage cover />);

    const element = screen.getByTitle(/broken image/i).closest('div');

    expect(element).toHaveClass('broken__image--cover');
  });
});
