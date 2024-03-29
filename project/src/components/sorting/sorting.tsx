import { useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { SortingOption } from '../../const';
import { getSorting } from '../../store/offers-process/selectors';
import { changeSorting } from '../../store/offers-process/offers-process';

function Sorting(): JSX.Element {
  const [isOpenSorting, setOpenSorting] = useState(false);

  const selectedSorting = useAppSelector(getSorting);

  const dispatch = useAppDispatch();

  function handleSortOptionClick (sorting: SortingOption) {
    dispatch(changeSorting(sorting));
    setOpenSorting(false);
  }

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by&nbsp;</span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setOpenSorting(!isOpenSorting)}>
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
              onClick={() => handleSortOptionClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>}
    </form>
  );
}

export default Sorting;
