import { store } from '../store/index';
import { City, Offer } from '../types/offer';
import { Review } from '../types/review';
import { UserData } from '../types/user-data';
import { AuthorizationStatus, RequestStatus, SortingOption } from '../const';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
};

export type DataProcess = {
  offers: Offer[];
  nearPlacesOffers: Offer[];
  reviews: Review[];
  isOffersDataLoading: boolean;
  reviewsPublishStatus: RequestStatus;
};

export type OffersProcess = {
  city: City;
  sorting: SortingOption;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
