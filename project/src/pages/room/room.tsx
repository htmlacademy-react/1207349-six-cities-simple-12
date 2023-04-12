import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { Offer } from '../../types/offer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchNearPlacesOffersAction } from '../../store/api-actions';
import NotFound from '../../pages/not-found/not-found';
import Header from '../../components/header/header';
import ReviewForm from '../../components/review-form/review-form';
import Map from '../../components/map/map';
import Offers from '../../components/offers/offers';

function Room(): JSX.Element {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const dispatch = useAppDispatch();

  const offerId = Number(useParams().id);

  useEffect(() => {
    dispatch(fetchNearPlacesOffersAction(offerId));
  }, [dispatch, offerId]);

  const offers = useAppSelector((state) => state.offers);
  const offer: Offer | undefined = offers.find((element) => element.id === offerId);
  const nearPlacesOffers = useAppSelector((state) => state.nearPlacesOffers);


  if (offer === undefined) {
    return <NotFound />;
  }

  const {title, rating, isPremium, images, type, bedrooms, maxAdults, price, goods, host, description, city} = offer;
  const {name, avatarUrl, isPro} = host;

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.slice(0,6).map((image) => (
                <div key={image} className="property__image-wrapper">
                  <img className="property__image" src={image} alt={title} />
                </div>
              ))}
            </div>
          </div>
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
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={avatarUrl} width="74" height="74" alt={name} />
                  </div>
                  <span className="property__user-name">{name}</span>
                  {isPro && <span className="property__user-status">Pro</span>}
                </div>
                <div className="property__description">
                  <p className="property__text">{description}</p>
                </div>
              </div>
              <section className="property__reviews reviews">
                {/* <ReviewList reviews={reviews} /> */}
                <ReviewForm />
              </section>
            </div>
          </div>
          <Map city={city} offers={nearPlacesOffers} activeCard={activeCard} className={'property__map'} />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <Offers offers={nearPlacesOffers} className={'near-places__list'} cardType={'near-places'} setActiveCard={setActiveCard} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Room;
