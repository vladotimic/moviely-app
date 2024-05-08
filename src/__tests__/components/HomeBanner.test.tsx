import { fireEvent, render, screen } from '@test-utils';
import HomeBanner from '@/components/HomeBanner';

describe('HomeBanner Component', () => {
  it('should render home banner', () => {
    render(<HomeBanner />);

    const banner = screen.getByRole('banner');

    expect(banner).toBeInTheDocument();
  });

  it('should have tv show and movie button tabs visible', () => {
    render(<HomeBanner />);

    const tvTabElement = screen.getByText(/tv show/i);
    const movieTabElement = screen.getByText(/movie/i);

    expect(tvTabElement).toBeInTheDocument();
    expect(movieTabElement).toBeInTheDocument();
    expect(tvTabElement).toBeVisible();
    expect(movieTabElement).toBeVisible();
  });

  it('should change value of an search input to spider', () => {
    render(<HomeBanner />);

    const inputElement = screen.getByPlaceholderText(/spider man/i);
    fireEvent.change(inputElement, { target: { value: 'spider' } });

    expect(inputElement).toHaveValue('spider');
  });

  it('should switch to movie tab', () => {
    render(<HomeBanner />);

    const buttonElement = screen.getByText(/movie/i);
    fireEvent.click(buttonElement);

    expect(buttonElement).toHaveClass('button--active');
  });
});
