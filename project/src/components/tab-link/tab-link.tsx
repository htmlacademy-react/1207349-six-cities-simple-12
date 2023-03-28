import { Link } from 'react-router-dom';
import { City } from '../../types/city';

type TabLinkProps = {
  city: City;
}

function TabLink({city}: TabLinkProps): JSX.Element {
  const activeClass = city.title === 'Amsterdam' ? ' tabs__item--active' : '';
  const classes = `locations__item-link tabs__item${activeClass}`;

  return (
    <li className="locations__item">
      <Link to="/" className={classes}>
        <span>{city.title}</span>
      </Link>
    </li>
  );
}

export default TabLink;
