import { useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { IoIosArrowBack } from 'react-icons/io';
import { FaImdb } from 'react-icons/fa';
import { useAppContext } from '@/context';
import { ActiveTab, IGenres, ILocationState } from '@/types';
import BrokenImage from '@/components/BrokenImage';
import Loader from '@/components/Loader';
import './Details.css';

interface IDetailsParams {
  [id: string]: string;
  type: ActiveTab;
}

interface IDetailsCoverImageProps
  extends React.ComponentPropsWithoutRef<'img'> {}

const URL = String(import.meta.env.VITE_IMAGE_URL_ROOT);

function formatGenres(genres: IGenres[] | undefined) {
  if (!genres) return '';

  return genres.map(({ name }, index) => {
    let genre = ` ${name} /`;
    if (index === genres.length - 1) {
      genre += ` ${name}`;
    }
    return genre;
  });
}

function formatRuntime(runtime: number | undefined) {
  if (!runtime) return '';

  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}:${minutes}h`;
}

function DetailsCoverImage({ src }: IDetailsCoverImageProps) {
  return src ? (
    <img src={`${URL}${src}`} alt='TV/Movie Cover' className='cover__image' />
  ) : (
    <BrokenImage cover />
  );
}

export default function MovieDetails() {
  const { type, id } = useParams<IDetailsParams>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as ILocationState;

  const { loading, error, details, fetchDetails, setActiveTab } =
    useAppContext();

  useEffect(() => {
    if (error) {
      setActiveTab('tv');
      navigate('/404', { state: null });
    }
    if (!error && id && type) {
      setActiveTab(type);
      void fetchDetails(id, type);
    }
  }, [id, type, error, setActiveTab, navigate, fetchDetails]);

  const {
    title,
    poster,
    cover,
    date,
    overview,
    status,
    runtime,
    imdb,
    trailer,
  } = details || {};

  const genres = formatGenres(details?.genres);
  const runtimeLength = formatRuntime(runtime);

  return (
    <section className='details__root'>
      {!loading && details ? (
        <div className='container'>
          <div className='details__link'>
            <Link to='/' state={state}>
              <IoIosArrowBack /> Go Back
            </Link>
          </div>

          <div>
            {trailer ? (
              <iframe
                title='YouTube Video Trailer'
                src={`https://www.youtube.com/embed/${trailer}`}
                className='details__trailer'
              />
            ) : (
              <DetailsCoverImage src={cover} />
            )}
          </div>

          <div className='details__info'>
            <div className='details__poster'>
              {poster ? (
                <img
                  src={`${URL}${poster}`}
                  alt='TV/Movie Poster'
                  className='poster__image'
                />
              ) : (
                <BrokenImage />
              )}
            </div>

            <div className='details__content-info'>
              {title && <h2 className='details__title'>{title}</h2>}
              {date && (
                <p className='details__date'>{dayjs(date).format('YYYY')}</p>
              )}
              {genres && <p className='details__genres'>{genres}</p>}
              {imdb && (
                <a
                  href={`https://www.imdb.com/title/${imdb}`}
                  target='_blank'
                  rel='noreferrer'
                  aria-label='IMDB Link'
                  className='details__imdb'
                >
                  <FaImdb /> &nbsp;
                </a>
              )}
              {status && (
                <p className='details__status'>
                  Status: <span>{status}</span>
                </p>
              )}
              {runtimeLength && (
                <p className='details__runtime'>
                  Runtime: <span>{runtimeLength}</span>
                </p>
              )}
              {overview && (
                <p className='details__overview'>
                  <span>Overview:</span> <br />
                  {overview}
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </section>
  );
}
