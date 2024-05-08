import { fireEvent, render, screen } from '@test-utils';
import SearchInput from '@/components/SearchInput';

describe('SearchInput Component', () => {
  it('should render component', () => {
    render(<SearchInput />);

    const inputElement = screen.getByPlaceholderText(/spider man/i);

    expect(inputElement).toBeInTheDocument();
  });

  it('should have spider value', () => {
    render(<SearchInput />);

    const inputElement = screen.getByPlaceholderText(/spider man/i);
    fireEvent.change(inputElement, { target: { value: 'Spider' } });

    expect(inputElement).toHaveValue('Spider');
  });
});
