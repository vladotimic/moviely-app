import { useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '@/context';
import { ILocationState } from '@/types';
import Loader from '@/components/Loader';
import Pagination from '@/components/Pagination';
import './Home.css';

const HomeBanner = lazy(() => import('@/components/HomeBanner'));
const Card = lazy(() => import('@/components/Card'));

export default function Home() {
  const location = useLocation();
  const state = location.state as ILocationState;

  const {
    topRated,
    data,
    loading,
    error,
    activeTab,
    searchTerm,
    isQuery,
    currentPage,
    pageSize,
    fetchTopRated,
    loadTopRatedData,
    resetDetails,
    setPage,
  } = useAppContext();

  useEffect(() => {
    if (isQuery) return;

    window.history.replaceState(null, '');
    resetDetails();

    if (topRated && activeTab in topRated) {
      loadTopRatedData();
      return;
    }
    void fetchTopRated(state?.data);
  }, [
    isQuery,
    activeTab,
    fetchTopRated,
    resetDetails,
    state,
    topRated,
    loadTopRatedData,
  ]);

  return (
    <Suspense fallback={<Loader />}>
      <HomeBanner />

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
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            setPage={setPage}
          />
        </div>
      </section>
    </Suspense>
  );
}
