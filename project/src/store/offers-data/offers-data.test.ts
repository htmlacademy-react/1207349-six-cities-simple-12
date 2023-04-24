import { offersData } from './offers-data';
import { DataProcess } from '../../types/state';
import { RequestStatus } from '../../const';
import { fetchNearPlacesOffersAction, fetchOffersAction, fetchReviewsAction, publishReviewAction } from '../api-actions';
import { makeFakeOffers, makeFakeReviews } from '../../utils/mocks';

const fakeOffers = makeFakeOffers();
const fakeNearPlacesOffers = makeFakeOffers(3);
const fakeReviews = makeFakeReviews();

function getFakeState({
  offers = [],
  nearPlacesOffers = [],
  reviews = [],
  isOffersDataLoading = false,
  reviewsPublishStatus = RequestStatus.Idle,
}: Partial<DataProcess>): DataProcess {
  return ({
    offers,
    nearPlacesOffers,
    reviews,
    isOffersDataLoading,
    reviewsPublishStatus,
  });
}

describe('Reducer: offersData', () => {
  let state: DataProcess;

  beforeEach(() => {
    state = getFakeState({});
  });

  it('without additional parameters should return initial state', () => {
    expect(offersData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual(getFakeState({}));
  });

  describe('fetchOffersAction test', () => {
    it('should update isOffersDataLoading to true if fetchOffersAction pending', () => {
      expect(offersData.reducer(state, { type: fetchOffersAction.pending.type }))
        .toEqual(getFakeState({isOffersDataLoading: true}));
    });
    it('should update isOffersDataLoading to false and offers to load offers if fetchOffersAction fulfilled', () => {
      expect(offersData.reducer(state, { type: fetchOffersAction.fulfilled.type, payload: fakeOffers }))
        .toEqual(getFakeState({offers: fakeOffers}));
    });
    it('should return initial state if fetchOffersAction rejected', () => {
      expect(offersData.reducer(state, { type: fetchOffersAction.rejected.type }))
        .toEqual(getFakeState({}));
    });
  });

  describe('fetchNearPlacesOffersAction test', () => {
    it('should update nearPlacesOffers to load nearPlacesOffers', () => {
      expect(offersData.reducer(state, { type: fetchNearPlacesOffersAction.fulfilled.type, payload: fakeNearPlacesOffers }))
        .toEqual(getFakeState({nearPlacesOffers: fakeNearPlacesOffers}));
    });
  });

  describe('fetchReviewsAction test', () => {
    it('should update reviews to load reviews', () => {
      expect(offersData.reducer(state, { type: fetchReviewsAction.fulfilled.type, payload: fakeReviews }))
        .toEqual(getFakeState({reviews: fakeReviews}));
    });
  });

  describe('publishReviewAction test', () => {
    it('should update reviewsPublishStatus to "PENDING" if publishReviewAction pending', () => {
      expect(offersData.reducer(state, { type: publishReviewAction.pending.type }))
        .toEqual(getFakeState({reviewsPublishStatus: RequestStatus.Pending}));
    });
    it('should update reviewsPublishStatus to "FULFILLED" and reviews to load reviews if publishReviewAction fulfilled', () => {
      expect(offersData.reducer(state, { type: publishReviewAction.fulfilled.type, payload: fakeReviews }))
        .toEqual(getFakeState({reviews: fakeReviews, reviewsPublishStatus: RequestStatus.Fulfilled}));
    });
    it('should update reviewsPublishStatus to "REJECTED" if publishReviewAction rejected', () => {
      expect(offersData.reducer(state, { type: publishReviewAction.rejected.type }))
        .toEqual(getFakeState({reviewsPublishStatus: RequestStatus.Rejected}));
    });
  });
});
