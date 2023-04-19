import { offersData } from './offers-data';
import { DataProcess } from '../../types/state';
import { RequestStatus } from '../../const';
import { fetchNearPlacesOffersAction, fetchOffersAction, fetchReviewsAction, publishReviewAction } from '../api-actions';
import { makeFakeOffers, makeFakeReviews } from '../../utils/mocks';

const offers = makeFakeOffers();
const nearPlacesOffers = makeFakeOffers(3);
const reviews = makeFakeReviews();

describe('Reducer: user', () => {
  let state: DataProcess;

  beforeEach(() => {
    state = {
      offers: [],
      nearPlacesOffers: [],
      reviews: [],
      isOffersDataLoading: false,
      reviewsPublishStatus: RequestStatus.Idle,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(offersData.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        offers: [],
        nearPlacesOffers: [],
        reviews: [],
        isOffersDataLoading: false,
        reviewsPublishStatus: RequestStatus.Idle,
      });
  });

  describe('fetchOffersAction test', () => {
    it('should update isOffersDataLoading to true if fetchOffersAction pending', () => {
      expect(offersData.reducer(state, { type: fetchOffersAction.pending.type }))
        .toEqual({
          offers: [],
          nearPlacesOffers: [],
          reviews: [],
          isOffersDataLoading: true,
          reviewsPublishStatus: RequestStatus.Idle,
        });
    });
    it('should update isOffersDataLoading to false and offers to load offers if fetchOffersAction fulfilled', () => {
      expect(offersData.reducer(state, { type: fetchOffersAction.fulfilled.type, payload: offers }))
        .toEqual({
          offers,
          nearPlacesOffers: [],
          reviews: [],
          isOffersDataLoading: false,
          reviewsPublishStatus: RequestStatus.Idle,
        });
    });
    it('should return initial state if fetchOffersAction rejected', () => {
      expect(offersData.reducer(state, { type: fetchOffersAction.rejected.type }))
        .toEqual({
          offers: [],
          nearPlacesOffers: [],
          reviews: [],
          isOffersDataLoading: false,
          reviewsPublishStatus: RequestStatus.Idle,
        });
    });
  });

  describe('fetchNearPlacesOffersAction test', () => {
    it('should update nearPlacesOffers to load nearPlacesOffers', () => {
      expect(offersData.reducer(state, { type: fetchNearPlacesOffersAction.fulfilled.type, payload: nearPlacesOffers }))
        .toEqual({
          offers: [],
          nearPlacesOffers,
          reviews: [],
          isOffersDataLoading: false,
          reviewsPublishStatus: RequestStatus.Idle,
        });
    });
  });

  describe('fetchReviewsAction test', () => {
    it('should update reviews to load reviews', () => {
      expect(offersData.reducer(state, { type: fetchReviewsAction.fulfilled.type, payload: reviews }))
        .toEqual({
          offers: [],
          nearPlacesOffers: [],
          reviews,
          isOffersDataLoading: false,
          reviewsPublishStatus: RequestStatus.Idle,
        });
    });
  });

  describe('publishReviewAction test', () => {
    it('should update reviewsPublishStatus to "PENDING" if publishReviewAction pending', () => {
      expect(offersData.reducer(state, { type: publishReviewAction.pending.type }))
        .toEqual({
          offers: [],
          nearPlacesOffers: [],
          reviews: [],
          isOffersDataLoading: false,
          reviewsPublishStatus: RequestStatus.Pending,
        });
    });
    it('should update reviewsPublishStatus to "FULFILLED" and reviews to load reviews if publishReviewAction fulfilled', () => {
      expect(offersData.reducer(state, { type: publishReviewAction.fulfilled.type, payload: reviews }))
        .toEqual({
          offers: [],
          nearPlacesOffers: [],
          reviews,
          isOffersDataLoading: false,
          reviewsPublishStatus: RequestStatus.Fulfilled,
        });
    });
    it('should update reviewsPublishStatus to "REJECTED" if publishReviewAction rejected', () => {
      expect(offersData.reducer(state, { type: publishReviewAction.rejected.type }))
        .toEqual({
          offers: [],
          nearPlacesOffers: [],
          reviews: [],
          isOffersDataLoading: false,
          reviewsPublishStatus: RequestStatus.Rejected,
        });
    });
  });
});
