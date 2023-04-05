import { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { SORTING_OPTIONS } from '../../const';
import { changeSorting } from '../../store/action';

type SortingProps = {
  selectedSorting: string;
}

function Sorting({selectedSorting}: SortingProps): JSX.Element {
  const [isOpenSorting, setOpenSorting] = useState<boolean>(false);

  function openSortingHandler() {
    setOpenSorting(!isOpenSorting);
  }

  const dispatch = useAppDispatch();

  function chooseSortHandler(sorting: string) {
    dispatch(changeSorting(sorting));
    setOpenSorting(false);
  }

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={openSortingHandler}>
        {selectedSorting}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isOpenSorting &&
        <ul className="places__options places__options--custom places__options--opened">
          {Object.values(SORTING_OPTIONS).map((item) => {
            const activeClass = item === selectedSorting ? ' places__option--active' : '';
            const classes = `places__option${activeClass}`;

            return <li key={item} className={classes} tabIndex={0} onClick={() => chooseSortHandler(item)}>{item}</li>;
          })}
        </ul>}
    </form>
  );
}

export default Sorting;
