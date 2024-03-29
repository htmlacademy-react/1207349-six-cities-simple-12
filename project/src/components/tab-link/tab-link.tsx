import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { MouseEvent, memo } from 'react';
import { City } from '../../types/offer';
import { useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/offers-process/offers-process';

type TabLinkProps = {
  city: City;
  selectedCity: string;
}

function TabLink({city, selectedCity}: TabLinkProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleLinkClick = (evt: MouseEvent<HTMLElement>) => {
    evt.preventDefault();
    dispatch(changeCity(city));
  };

  return (
    <li className="locations__item">
      <Link
        to="/"
        className={classNames('locations__item-link tabs__item', {'tabs__item--active': city.name === selectedCity})}
        onClick={handleLinkClick}
      >
        <span>{city.name}</span>
      </Link>
    </li>
  );
}

export default memo(TabLink);
