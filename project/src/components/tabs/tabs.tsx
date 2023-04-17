import { city } from '../../const';
import { useAppSelector } from '../../hooks';
import TabLink from '../tab-link/tab-link';


function Tabs(): JSX.Element {
  const selectedCity = useAppSelector((state) => state.city);

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
