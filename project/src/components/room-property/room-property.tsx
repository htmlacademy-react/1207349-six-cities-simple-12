import { useAppSelector } from '../../hooks';
import { getReviews } from '../../store/offers-data/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { sortingReviews } from '../../utils/utils';
import { AuthorizationStatus, DisplayCount } from '../../const';
import { Offer } from '../../types/offer';
import ReviewForm from '../review-form/review-form';
import ReviewList from '../review-list/review-list';
import RoomHost from '../room-host/room-host';

type RoomPropertyProps = {
  offer: Offer;
}

function RoomProperty({offer}: RoomPropertyProps): JSX.Element {
  const reviews = sortingReviews([...useAppSelector(getReviews)]).slice(0, DisplayCount.Reviews);
  const isAuth = useAppSelector(getAuthorizationStatus) === AuthorizationStatus.Auth;

  const {title, rating, isPremium, type, bedrooms, maxAdults, price, goods, host, description, id} = offer;

  return (
    <div className="property__container container">
      <div className="property__wrapper">
        {isPremium &&
          <div className="property__mark">
            <span>Premium</span>
          </div> }
        <div className="property__name-wrapper">
          <h1 className="property__name">{title}</h1>
        </div>
        <div className="property__rating rating">
          <div className="property__stars rating__stars">
            <span style={{ width: `${Math.round(rating) * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
          <span className="property__rating-value rating__value">{rating}</span>
        </div>
        <ul className="property__features">
          <li className="property__feature property__feature--entire">
            {type}
          </li>
          <li className="property__feature property__feature--bedrooms">
            {bedrooms} Bedrooms
          </li>
          <li className="property__feature property__feature--adults">
            Max {maxAdults} adults
          </li>
        </ul>
        <div className="property__price">
          <b className="property__price-value">&euro;{price}</b>
          <span className="property__price-text">&nbsp;night</span>
        </div>
        <div className="property__inside">
          <h2 className="property__inside-title">What&apos;s inside</h2>
          <ul className="property__inside-list">
            {goods.map((good) => (
              <li key={good} className="property__inside-item">
                {good}
              </li>
            ))}
          </ul>
        </div>
        <RoomHost host={host} description={description} />
        <section className="property__reviews reviews">
          {reviews.length > 0 && <ReviewList reviews={reviews} />}
          {isAuth && <ReviewForm offerId={id} />}
        </section>
      </div>
    </div>
  );
}

export default RoomProperty;
