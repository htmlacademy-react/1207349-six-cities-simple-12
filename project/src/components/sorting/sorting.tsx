import { useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { SortingOption } from '../../const';
import { changeSorting } from '../../store/action';

function Sorting(): JSX.Element {
  const [isOpenSorting, setOpenSorting] = useState(false);

  const selectedSorting = useAppSelector((state) => state.sorting);

  function openSortingHandler() {
    setOpenSorting(!isOpenSorting);
  }

  const dispatch = useAppDispatch();

  function chooseSortHandler(sorting: SortingOption) {
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
          {Object.values(SortingOption).map((item) => (
            <li
              key={item}
              className={classNames('places__option', {'places__option--active': item === selectedSorting })}
              tabIndex={0}
              onClick={() => chooseSortHandler(item)}
            >
              {item}
            </li>
          ))}
        </ul>}
    </form>
  );
}

export default Sorting;
