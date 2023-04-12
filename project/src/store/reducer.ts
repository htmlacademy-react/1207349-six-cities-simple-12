import { createReducer } from '@reduxjs/toolkit';
import { AuthorizationStatus, CITIES, SortingOption } from '../const';
import { City } from '../types/offer';
import { Offer } from '../types/offer';
import { changeCity, changeSorting, loadReviews, loadNearPlacesOffers, loadOffers, loadUser, requireAuthorization, setOffersDataLoadingStatus } from './action';
import { UserData } from '../types/user-data';
import { Review } from '../types/review';

type InitialState = {
  city: City;
  offers: Offer[];
  nearPlacesOffers: Offer[];
  reviews: Review[];
  sorting: SortingOption;
  isOffersDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  user: UserData | null;
}

const initialState: InitialState = {
  city: CITIES[0],
  offers: [],
  nearPlacesOffers: [],
  reviews: [],
  sorting: SortingOption.pop,
  isOffersDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeSorting, (state, action) => {
      state.sorting = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadNearPlacesOffers, (state, action) => {
      state.nearPlacesOffers = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(loadUser, (state, action) => {
      state.user = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export default reducer;
