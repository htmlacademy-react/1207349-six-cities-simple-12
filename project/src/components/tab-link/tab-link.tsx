import { Link } from 'react-router-dom';
import { MouseEvent } from 'react';
import { City } from '../../types/city';

type TabLinkProps = {
  city: City;
  selectedCity: string;
  changeCityHandler: (city: City) => void;
}

function TabLink({city, selectedCity, changeCityHandler}: TabLinkProps): JSX.Element {
  const activeClass = city.title === selectedCity ? ' tabs__item--active' : '';
  const classes = `locations__item-link tabs__item${activeClass}`;

  const clickHandler = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    changeCityHandler(city);
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
