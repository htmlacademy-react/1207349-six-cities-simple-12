import { createReducer } from '@reduxjs/toolkit';
import { CITIES } from '../const';
import { changeCity } from './action';
import { offers } from '../mocks/offers';

const initialState = {
  city: CITIES[0],
  offers: offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    });
});

export default reducer;
