import { Offer } from '../../types/offer';
import Card from '../card/card';

type OffersProps = {
  offers: Offer[];
  className: string;
  cardType: string;
  onMouseOver?: (id: number | null) => void;
}

function Offers({offers, className, cardType, onMouseOver}: OffersProps): JSX.Element {
  return (
    <div className={className}>
      {offers.map((offer) => <Card key={offer.id} offer={offer} cardType={cardType} onMouseOver={onMouseOver} />)}
    </div>
  );
}

export default Offers;
