import { NameSpace, RequestStatus } from '../../const';
import { Offer } from '../../types/offer';
import { Review } from '../../types/review';
import { State } from '../../types/state';

export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;
export const getNearPlacesOffers = (state: State): Offer[] => state[NameSpace.Data].nearPlacesOffers;
export const getReviews = (state: State): Review[] => state[NameSpace.Data].reviews;
export const getOffersDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isOffersDataLoading;
export const getReviewsPublishStatus = (state: State): RequestStatus => state[NameSpace.Data].reviewsPublishStatus;
