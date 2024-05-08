import { fireEvent, render, screen } from '@test-utils';
import Pagination, { IPaginationProps } from '@/components/Pagination';

const pageProps: IPaginationProps = {
  currentPage: 1,
  pageSize: 10,
  setPage: () => {},
  nextPage: () => {},
  prevPage: () => {},
};

describe('Pagination Component', () => {
  it('should render pagination componen', () => {
    render(<Pagination {...pageProps} />);

    const currentPage = screen.getByText(1);

    expect(currentPage).toBeInTheDocument();
  });

  it('should switch to page 3', () => {
    const setPage = vi.fn();

    render(<Pagination {...pageProps} setPage={setPage} />);

    const pageThree = screen.getByText(3);
    fireEvent.click(pageThree);

    expect(pageThree).toBeInTheDocument();
    expect(setPage).toHaveBeenCalledOnce();
  });
});
