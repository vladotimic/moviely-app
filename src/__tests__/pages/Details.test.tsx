import { Routes, Route } from 'react-router-dom';
import { render, screen } from '@test-utils';
import { Details } from '@/pages';

function DetailsRoute() {
  return (
    <Routes>
      <Route path='/details/:type/:id' element={<Details />} />
    </Routes>
  );
}

describe('Details Page', () => {
  it('should load detailed data for breaking bad tv show', async () => {
    render(<DetailsRoute />, {
      initialEntries: ['/details/tv/1396'],
    });

    const titleElement = await screen.findByText(/breaking bad/i);

    expect(titleElement).toBeInTheDocument();
  });

  it('should load detailed data for the godfather movie', async () => {
    render(<DetailsRoute />, {
      initialEntries: ['/details/tv/238'],
    });

    const titleElement = await screen.findByText(/the godfather/i);

    expect(titleElement).toBeInTheDocument();
  });
});
