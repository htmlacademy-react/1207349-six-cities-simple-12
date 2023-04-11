import { useState } from 'react';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks';
import { CITIES } from '../../const';
import { sortingOffers } from '../../utils';
import Header from '../../components/header/header';
import Offers from '../../components/offers/offers';
import Sorting from '../../components/sorting/sorting';
import Map from '../../components/map/map';
import TabLink from '../../components/tab-link/tab-link';

function Main(): JSX.Element {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const selectedCity = useAppSelector((state) => state.city);
  const selectedSorting = useAppSelector((state) => state.sorting);

  const offers = useAppSelector((state) => sortingOffers(state.offers.filter((offer) => offer.city.name === state.city.name), selectedSorting));

  return (
    <div className="page page--gray page--main">
      <Header />
      <main className={classNames('page__main page__main--index', {'page__main--index-empty': offers.length === 0})}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {CITIES.map((city) => <TabLink key={city.name} city={city} selectedCity={selectedCity.name} />)}
            </ul>
          </section>
        </div>
        {offers.length > 0 ?
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offers.length} places to stay in {selectedCity.name}</b>
                <Sorting />
                <Offers offers={offers} className="cities__places-list tabs__content" cardType="cities" setActiveCard={setActiveCard} />
              </section>
              <div className="cities__right-section">
                <Map city={selectedCity} offers={offers} activeCard={activeCard} className="cities__map" />
              </div>
            </div>
          </div> :
          <div className="cities">
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <p className="cities__status-description">We could not find any property available at the moment in {selectedCity.name}</p>
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>
          </div> }
      </main>
    </div>
  );
}

export default Main;
