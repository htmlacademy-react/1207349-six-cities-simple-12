import { Link } from 'react-router-dom';
import { MouseEvent } from 'react';
import { City } from '../../types/city';
import { useAppDispatch } from '../../hooks';
import { changeCity } from '../../store/action';

type TabLinkProps = {
  city: City;
  selectedCity: string;
}

function TabLink({city, selectedCity}: TabLinkProps): JSX.Element {
  const activeClass = city.title === selectedCity ? ' tabs__item--active' : '';
  const classes = `locations__item-link tabs__item${activeClass}`;

  const dispatch = useAppDispatch();

  const clickHandler = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    dispatch(changeCity(city));
  };

  return (
    <li className="locations__item">
      <Link to="/" className={classes} onClick={clickHandler}>
        <span>{city.title}</span>
      </Link>
    </li>
  );
}

export default TabLink;
