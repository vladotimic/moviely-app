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

  it('should trigger search after "ave" input value for tv shows', async () => {
    render(<Home />);

    const searchInput = screen.getByPlaceholderText(/spider man/i);
    fireEvent.change(searchInput, { target: { value: 'ave' } });

    const firstCard = await screen.findByText('Second Avenue');

    expect(firstCard).toBeInTheDocument();
    expect(firstCard).toBeVisible();
  });

  it('should trigger search after "ave" input value for movies', async () => {
    render(<Home />);

    const movieTab = screen.getByRole('button', { name: /movie/i });
    fireEvent.click(movieTab);

    const searchInput = screen.getByPlaceholderText(/spider man/i);
    fireEvent.change(searchInput, { target: { value: 'ave' } });

    const firstCard = await screen.findByText('Bird');

    expect(firstCard).toBeInTheDocument();
    expect(firstCard).toBeVisible();
  });

  it('should get six total page results for the avengers movie query', async () => {
    render(<Home />);

    const movieTab = screen.getByRole('button', { name: /movie/i });
    fireEvent.click(movieTab);

    const searchInput = screen.getByPlaceholderText(/spider man/i);
    fireEvent.change(searchInput, { target: { value: 'avengers' } });

    const totalPageResults = await screen.findByText(6);

    expect(totalPageResults).toHaveTextContent('6');
    expect(totalPageResults).toBeVisible();
    expect(totalPageResults.parentElement).toHaveAttribute(
      'data-testid',
      'pagination-component',
    );
  });

  it('should have avengers: endgame for the avengers movie query on the first page', async () => {
    render(<Home />);

    const movieTab = screen.getByRole('button', { name: /movie/i });
    fireEvent.click(movieTab);

    const searchInput = screen.getByPlaceholderText(/spider man/i);
    fireEvent.change(searchInput, { target: { value: 'avengers' } });

    const cardElement = await screen.findByText(/avengers: endgame/i);

    expect(cardElement).toBeInTheDocument();
    expect(cardElement).toBeVisible();
  });

  it('should have avenger x for the avengers movie query on the fourth page', async () => {
    render(<Home />);

    const movieTab = screen.getByRole('button', { name: /movie/i });
    fireEvent.click(movieTab);

    const searchInput = screen.getByPlaceholderText(/spider man/i);
    fireEvent.change(searchInput, { target: { value: 'avengers' } });

    const buttonElement = await screen.findByText(4);
    fireEvent.click(buttonElement);

    const cardElement = await screen.findByText(/avenger x/i);

    expect(cardElement).toBeInTheDocument();
    expect(cardElement).toBeVisible();
  });

  it('should render there is no result for "cdda" movie search term', async () => {
    render(<Home />);

    const movieTab = screen.getByRole('button', { name: /movie/i });
    fireEvent.click(movieTab);

    const searchInput = screen.getByPlaceholderText(/spider man/i);
    fireEvent.change(searchInput, { target: { value: 'cdda' } });

    const textElement = await screen.findByText(/there is no results/i);

    expect(textElement).toBeInTheDocument();
  });

  it('should render there is no result for "cdda" tv show search term', async () => {
    render(<Home />);

    const searchInput = screen.getByPlaceholderText(/spider man/i);
    fireEvent.change(searchInput, { target: { value: 'cdda' } });

    const textElement = await screen.findByText(/there is no results/i);

    expect(textElement).toBeInTheDocument();
  });
});
