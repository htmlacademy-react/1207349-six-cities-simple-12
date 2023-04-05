import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { CITIES } from '../../const';
import Header from '../../components/header/header';
import Offers from '../../components/offers/offers';
import Sorting from '../../components/sorting/sorting';
import Map from '../../components/map/map';
import TabLink from '../../components/tab-link/tab-link';

function Main(): JSX.Element {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const selectedCity = useAppSelector((state) => state.city);
  const selectedSorting = useAppSelector((state) => state.sorting);

  const offers = useAppSelector((state) => state.offers.filter((offer) => offer.city === state.city.title));

  return (
    <div className="page page--gray page--main">
      <Header isAuth />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {CITIES.map((city) => <TabLink key={city.title} city={city} selectedCity={selectedCity.title} />)}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {selectedCity.title}</b>
              <Sorting selectedSorting={selectedSorting} />
              <Offers offers={offers} className={'cities__places-list tabs__content'} cardType={'cities'} setActiveCard={setActiveCard} />
            </section>
            <div className="cities__right-section">
              <Map city={selectedCity} offers={offers} activeCard={activeCard} className="cities__map" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
