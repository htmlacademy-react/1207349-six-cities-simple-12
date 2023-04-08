import { createReducer } from '@reduxjs/toolkit';
import { CITIES, SortingOption } from '../const';
import { changeCity, changeSorting } from './action';
import { offers } from '../mocks/offers';

const initialState = {
  city: CITIES[0],
  offers: offers,
  sorting: SortingOption.pop,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(changeSorting, (state, action) => {
      state.sorting = action.payload;
    });
});

export default reducer;
