import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppContext } from '@/context';
import { ILocationState } from '@/types';
import { HomeBanner, Card, Loader, Pagination } from '@/components';
import './Home.css';

export default function HomePage() {
  const navigate = useNavigate();
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

  const handlePageChange = (page: number) => {
    navigate('', { state: null, replace: true });
    setPage(page);
  };

  return (
    <>
      <HomeBanner />

      <main
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
            setPage={handlePageChange}
          />
        </div>
      </main>
    </>
  );
}
