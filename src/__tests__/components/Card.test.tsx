import { render, screen } from '@test-utils';
import Card, { ICardProps } from '@/components/Card';

const cardProps: ICardProps = {
  id: 1,
  title: 'Breaking Bad',
  activeTab: 'tv',
  poster: '/ztkUQFLlC19CCMYHW9o1zWhJRNq.jpg',
  date: '2008-01-20',
};

describe('Card Component', () => {
  it('should render card component', () => {
    render(<Card {...cardProps} />);

    const cardComponent = screen.getByText(/breaking bad/i);

    expect(cardComponent).toBeInTheDocument();
  });

  it('should render broken image component if poster prop is not provided', () => {
    render(<Card {...cardProps} poster='' />);

    const brokenImage = screen.getByText(/broken image/i);

    expect(brokenImage).toBeInTheDocument();
  });
});
