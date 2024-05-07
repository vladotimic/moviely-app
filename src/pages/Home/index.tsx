import { useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '@/context';
import { ILocationState } from '@/types';
import Loader from '@/components/Loader';
import Pagination from '@/components/Pagination';
import './Home.css';

const Header = lazy(() => import('@/components/Header'));
const Card = lazy(() => import('@/components/Card'));

export default function Home() {
  const location = useLocation();
  const state = location.state as ILocationState;

  const {
    data,
    loading,
    error,
    activeTab,
    searchTerm,
    isQuery,
    currentPage,
    pageSize,
    fetchTopRated,
    resetDetails,
  } = useAppContext();

  useEffect(() => {
    if (isQuery) return;

    resetDetails();
    void fetchTopRated(state?.data);
    window.history.replaceState(null, '');
  }, [isQuery, activeTab, fetchTopRated, resetDetails, state]);

  return (
    <Suspense fallback={<Loader />}>
      <Header />
      <section
        className='container card-list__section card-grid__container'
        style={{
          ...(loading && {
            justifyContent: 'center',
          }),
        }}
      >
        {loading && <Loader />}

        {data.length !== 0 &&
          data.map((item) => {
            const { id, ...rest } = item;
            return (
              <div key={id} className='card-grid__item'>
                <Card
                  id={id}
                  activeTab={activeTab}
                  state={{
                    data,
                    activeTab,
                    searchTerm,
                    currentPage,
                    pageSize,
                  }}
                  {...rest}
                />
              </div>
            );
          })}

        {!loading && !error && data.length === 0 && (
          <h3 className='home-text__info'>There is no results!</h3>
        )}

        {error && (
          <h3 className='home-text__info'>
            There was an error while trying to retrieve the data!
          </h3>
        )}

        <div className='home__pagination'>
          <Pagination />
        </div>
      </section>
    </Suspense>
  );
}