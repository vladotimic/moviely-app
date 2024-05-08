import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ActiveTab, ILocationState } from '@/types';
import { useAppContext } from '@/context';
import SearchInput from '../SearchInput';
import Button from '../Button';
import './HomeBanner.css';

function HomeBanner() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as ILocationState;

  const {
    activeTab,
    searchTerm,
    isQuery,
    currentPage,
    fetchTopRated,
    fetchSearch,
    setSearchTerm,
    setActiveTab,
    setPage,
  } = useAppContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    navigate('/', { state: null });
    setSearchTerm(e.target.value || '');
    setPage(1);
  };

  const handleSwitch = (type: ActiveTab) => {
    navigate('/', { state: null });
    setActiveTab(type || 'tv');
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
    <header className='banner__root'>
      <div className='banner__content'>
        <div className='banner__tabs'>
          <Button
            isActive={activeTab === 'tv'}
            onClick={() => handleSwitch('tv')}
          >
            TV Show
          </Button>
          <Button
            isActive={activeTab === 'movie'}
            onClick={() => handleSwitch('movie')}
          >
            Movie
          </Button>
        </div>

        <div className='banner__search'>
          <SearchInput value={searchTerm} onChange={handleChange} />
        </div>
      </div>

      <div className='banner__overlay' />
    </header>
  );
}

export default HomeBanner;
