import { useState } from 'react';
import { Offer } from '../../types/offer';
import Card from '../card/card';

type OffersProps = {
  offers: Offer[];
}

function Offers({offers}: OffersProps): JSX.Element {
  const [, setActiveCard] = useState<number | null>(null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <Card key={offer.id} offer={offer} setActiveCard={setActiveCard} />)}
    </div>
  );
}

export default Offers;
