import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '@/context';
import { ILocationState } from '@/types';
import './SearchInput.css';

function SearchInput() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as ILocationState;

  const {
    searchTerm,
    isQuery,
    currentPage,
    activeTab,
    fetchTopRated,
    fetchSearch,
    setSearchTerm,
    setPage,
  } = useAppContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    navigate('/', { state: null });
    setSearchTerm(e.target.value || '');
    setPage(1);
  };

  useEffect(() => {
    if (!isQuery) return () => null;

    const search = setTimeout(() => {
      void fetchSearch(searchTerm, {
        data: state?.data,
        pageSize: state?.pageSize,
        currentPage: state?.currentPage ?? currentPage,
      });
    }, 1000);

    return () => clearTimeout(search);
  }, [
    activeTab,
    searchTerm,
    isQuery,
    currentPage,
    fetchTopRated,
    fetchSearch,
    state,
  ]);

  useEffect(() => {
    if (state?.searchTerm) {
      setSearchTerm(state?.searchTerm);
      window.history.replaceState(null, '');
    }
  }, [state, setSearchTerm]);

  return (
    <div>
      <label htmlFor='searchTerm'>Search:</label>
      <div className='search-input__base'>
        <input
          id='searchTerm'
          type='text'
          className='search-input__field'
          value={searchTerm}
          onChange={handleChange}
          placeholder='Spider Man: No Way Home'
        />
      </div>
    </div>
  );
}

export default SearchInput;
