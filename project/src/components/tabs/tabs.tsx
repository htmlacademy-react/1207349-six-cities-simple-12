import { city } from '../../const';
import { useAppSelector } from '../../hooks';
import { getCity } from '../../store/offers-process/selectors';
import TabLink from '../tab-link/tab-link';


function Tabs(): JSX.Element {
  const selectedCity = useAppSelector(getCity);

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {Object.values(city).map((cityItem) => <TabLink key={cityItem.name} city={cityItem} selectedCity={selectedCity.name} />)}
          </ul>
        </section>
      </div>
    </>
  );
}

export default Tabs;
