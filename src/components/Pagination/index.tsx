import { useMemo } from 'react';
import classNames from 'classnames';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { IPagination } from '@/types';
import './Pagination.css';

interface IPaginationHooks extends IPagination {
  siblingCount?: number;
}

export interface IPaginationProps extends IPagination {
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

export const DOTS = '...';

const range = (start: number, end: number) => {
  const length = end - start + 1;
  /*
  	Create an array of certain length and set the elements within it from
    start value to end value.
  */
  return Array.from({ length }, (_, idx) => idx + start);
};

const usePagination = ({
  pageSize = 20,
  siblingCount = 1,
  currentPage,
}: IPaginationHooks) => {
  const paginationRange = useMemo(() => {
    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= pageSize) {
      return range(1, pageSize);
    }

    /*
    	Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
    */
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, pageSize);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < pageSize - 2;

    const firstPageIndex = 1;
    const lastPageIndex = pageSize;

    /*
    	Case 2: No left dots to show, but rights dots to be shown
    */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, pageSize];
    }

    /*
    	Case 3: No right dots to show, but left dots to be shown
    */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(pageSize - rightItemCount + 1, pageSize);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    /*
    	Case 4: Both left and right dots to be shown
    */
    const middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }, [pageSize, siblingCount, currentPage]);

  return paginationRange;
};

function Pagination({
  currentPage,
  pageSize,
  setPage,
  nextPage,
  prevPage,
}: IPaginationProps) {
  const paginationRange = usePagination({
    currentPage,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <div
      className={classNames('pagination-container')}
      data-testid='pagination-component'
    >
      <button
        className={classNames('pagination-item', {
          disabled: currentPage === 1,
        })}
        aria-label='Back'
        onClick={prevPage}
      >
        <IoIosArrowBack />
      </button>

      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <button
              key={`page-number-${index + 1}`}
              className='pagination-item dots'
            >
              &#8230;
            </button>
          );
        }

        return (
          <button
            key={`page-number-${index + 1}`}
            className={classNames('pagination-item', {
              selected: pageNumber === currentPage,
            })}
            onClick={() => setPage(+pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        className={classNames('pagination-item', {
          disabled: currentPage === lastPage,
        })}
        aria-label='Next'
        onClick={nextPage}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
}

export default Pagination;
