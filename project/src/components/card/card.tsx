import { Link } from 'react-router-dom';
import { memo } from 'react';
import { Offer } from '../../types/offer';
import { AppRoute } from '../../const';

type CardProps = {
  offer: Offer;
  cardType: string;
  setActiveCard?: (id: number | null) => void;
}

function Card({offer, cardType, setActiveCard}: CardProps): JSX.Element {
  const {id, previewImage, title, isPremium, type, rating, price} = offer;

  return (
    <article
      className={`${cardType}__card place-card`}
      onMouseOver={() => setActiveCard && setActiveCard(id)}
    >
      {isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div> }
      <div className={`${cardType}__image-wrapper place-card__image-wrapper`}>
        <Link to={AppRoute.Offer.replace(':id', id.toString())}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt={title} />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${Math.round(rating) * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={AppRoute.Offer.replace(':id', id.toString())}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export default memo(Card);
