import { render, screen } from '@test-utils';
import { NotFound } from '@/pages';

describe('NotFound Page', () => {
  it('should render not found page on wrong route', async () => {
    render(<NotFound />, {
      initialEntries: ['/xyz'],
    });

    const headingElement = await screen.findByText(/404 page/i);

    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toBeVisible();
  });

  it('should render not found page for /details/bob/123 route', async () => {
    render(<NotFound />, {
      initialEntries: ['/details/bob/123'],
    });

    const headingElement = await screen.findByText(/404 page/i);

    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toBeVisible();
  });
});
