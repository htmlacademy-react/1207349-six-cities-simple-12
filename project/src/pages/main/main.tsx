import { City } from '../../types/city';
import Header from '../../components/header/header';
import Offers from '../../components/offers/offers';
import Map from '../../components/map/map';
import { useState } from 'react';
import TabLink from '../../components/tab-link/tab-link';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeCity } from '../../store/action';
import { CITIES } from '../../const';

function Main(): JSX.Element {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const selectedCity = useAppSelector((state) => state.city);
  const offers = useAppSelector((state) => state.offers.filter((offer) => offer.city === selectedCity.title));

  const dispatch = useAppDispatch();

  const changeCityHandler = (city: City) => {
    dispatch(changeCity(city));
  };

  return (
    <div className="page page--gray page--main">
      <Header isAuth />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
              {CITIES.map((city) => <TabLink key={city.title} city={city} selectedCity={selectedCity.title} changeCityHandler={changeCityHandler} />)}
            </ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {selectedCity.title}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <Offers offers={offers} className={'cities__places-list tabs__content'} cardType={'cities'} setActiveCard={setActiveCard} />
            </section>
            <div className="cities__right-section">
              <Map city={selectedCity} offers={offers} activeCard={activeCard} className={'cities__map'} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
