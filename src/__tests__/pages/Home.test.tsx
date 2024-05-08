import { fireEvent, render, screen } from '@test-utils';
import { Home } from '@/pages';

describe('Home Page', () => {
  it('should render top 10 rated tv shows on initial load', async () => {
    render(<Home />);

    const listOfTvShows = await screen.findAllByTestId('card-element');

    expect(listOfTvShows.length).toBe(10);
  });

  it('should have tv show tab selected and have hazbin hotel show on initial load', async () => {
    render(<Home />);

    const buttonActiveTab = await screen.findByText(/tv show/i);
    const firstTvShow = await screen.findByText(/hazbin hotel/i);

    expect(buttonActiveTab).toHaveTextContent(/tv show/i);
    expect(firstTvShow).toBeInTheDocument();
  });

  it('should render breaking bad as on of the tv shows', async () => {
    render(<Home />);

    const tvShow = await screen.findByText(/breaking bad/i);

    expect(tvShow).toHaveTextContent(/breaking bad/i);
  });

  it('should load top 10 rated movies on tab switch', async () => {
    render(<Home />);

    const movieTab = screen.getByRole('button', { name: /movie/i });
    fireEvent.click(movieTab);

    const listOfMovies = await screen.findAllByTestId('card-element');
    const movie = await screen.findByText(/the shawshank redemption/i);

    expect(listOfMovies.length).toBe(10);
    expect(movie).toBeInTheDocument();
  });
});
