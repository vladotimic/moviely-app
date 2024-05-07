import { useNavigate } from 'react-router-dom';
import { ActiveTab } from '@/types';
import { useAppContext } from '@/context';
import SearchInput from '../SearchInput';
import Button from '../Button';
import './Header.css';

function Header() {
  const navigate = useNavigate();

  const { activeTab, setActiveTab, setPage } = useAppContext();

  const handleSwitch = (type: ActiveTab) => {
    navigate('/', { state: null });
    setActiveTab(type || 'tv');
    setPage(1);
  };

  return (
    <header className='header__root'>
      <div className='header__content'>
        <div className='header__tabs'>
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
        <div className='header__search'>
          <SearchInput />
        </div>
      </div>

      <div className='header__overlay' />
    </header>
  );
}

export default Header;
