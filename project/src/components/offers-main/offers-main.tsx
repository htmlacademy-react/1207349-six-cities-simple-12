import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import { sortingOffers } from '../../utils';
import { City, Offer } from '../../types/offer';
import Offers from '../../components/offers/offers';
import Sorting from '../../components/sorting/sorting';
import Map from '../../components/map/map';
import { getSorting } from '../../store/offers-processe/selectors';

type OffersMainProps = {
  offers: Offer[];
  selectedCity: City;
}
function OffersMain({offers, selectedCity}: OffersMainProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const selectedSorting = useAppSelector(getSorting);

  sortingOffers(offers, selectedSorting);

  return (
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
    </div>
  );
}

export default OffersMain;
