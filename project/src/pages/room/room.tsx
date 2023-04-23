import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchNearPlacesOffersAction, fetchReviewsAction } from '../../store/api-actions';
import { getNearPlacesOffers, getOffers } from '../../store/offers-data/selectors';
import NotFound from '../../pages/not-found/not-found';
import RoomGallery from '../../components/room-gallery/room-gallery';
import RoomProperty from '../../components/room-property/room-property';
import Offers from '../../components/offers/offers';
import Map from '../../components/map/map';
import Layout from '../../components/layout/layout';

function Room(): JSX.Element {
  const dispatch = useAppDispatch();

  const offerId = Number(useParams().id);

  useEffect(() => {
    dispatch(fetchNearPlacesOffersAction(offerId));
    dispatch(fetchReviewsAction(offerId));
  }, [dispatch, offerId]);

  const offers = useAppSelector(getOffers);
  const offer = offers.find((element) => element.id === offerId);
  const nearPlacesOffers = useAppSelector(getNearPlacesOffers);

  if (offer === undefined) {
    return <NotFound />;
  }

  const {images, title, city, id} = offer;

  return (
    <Layout>
      <main className="page__main page__main--property">
        <section className="property">
          <RoomGallery images={images} title={title} />
          <RoomProperty offer={offer} />
          <Map city={city} offers={[...nearPlacesOffers, offer]} activeCard={id} className={'property__map'} />
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <Offers offers={nearPlacesOffers} className={'near-places__list'} cardType={'near-places'} />
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default Room;
