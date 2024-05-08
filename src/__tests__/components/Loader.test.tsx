import { render, screen } from '@testing-library/react';
import Loader from '@/components/Loader';

describe('Loader Component', () => {
  it('should be in the document', () => {
    render(<Loader />);

    const loaderElement = screen.getByTestId('loader-component');

    expect(loaderElement).toBeInTheDocument();
  });
});
