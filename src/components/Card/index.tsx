import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { ActiveTab, IMovie, IState } from '@/types';
import BrokenImage from '../BrokenImage';
import './Card.css';

type CardState = Pick<
  IState,
  'data' | 'activeTab' | 'searchTerm' | 'currentPage' | 'pageSize'
>;

interface CardProps extends IMovie {
  activeTab: ActiveTab;
  state: CardState;
}

const URL = String(import.meta.env.VITE_IMAGE_URL_ROOT);

function Card({ id, title, activeTab, poster, date, state }: CardProps) {
  const releaseDate = dayjs(date).format('YYYY');

  return (
    <Link
      to={`/details/${activeTab}/${id}`}
      state={state}
      className='card__root'
    >
      <div className='card__media'>
        {poster ? (
          <img
            src={`${URL}${poster}`}
            alt='Media poster asset'
            className='card__image'
          />
        ) : (
          <BrokenImage />
        )}
      </div>
      <div className='card__text'>
        <h6 title={title}>{title}</h6>
        <p>{releaseDate}</p>
      </div>
    </Link>
  );
}

export default Card;
