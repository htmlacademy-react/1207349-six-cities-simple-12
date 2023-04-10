import { createReducer } from '@reduxjs/toolkit';
import { CITIES, SortingOption } from '../const';
import { City } from '../types/offer';
import { Offer } from '../types/offer';
import { changeCity, changeSorting, loadOffers, setOffersDataLoadingStatus } from './action';

type Offers = Offer[];

type InitialState = {
  city: City;
  offers: Offers;
  sorting: SortingOption;
  isOffersDataLoading: boolean;
}

const initialState: InitialState = {
  city: CITIES[0],
  offers: [],
  sorting: SortingOption.pop,
  isOffersDataLoading: false,
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
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});

export default reducer;
