import { Offer } from '../../types/offer';
import Card from '../card/card';

type OffersProps = {
  offers: Offer[];
  setActiveCard: (id: number | null) => void;
}

function Offers({offers, setActiveCard}: OffersProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <Card key={offer.id} offer={offer} setActiveCard={setActiveCard} />)}
    </div>
  );
}

export default Offers;
