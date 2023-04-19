import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OffersProcess } from '../../types/state';
import { city, NameSpace, SortingOption } from '../../const';
import { City } from '../../types/offer';

const initialState: OffersProcess = {
  city: city['Paris'],
  sorting: SortingOption.pop,
};

export const offersProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<City>) => {
      state.city = action.payload;
    },
    changeSorting: (state, action: PayloadAction<SortingOption>) => {
      state.sorting = action.payload;
    },
  },
});

export const {changeCity, changeSorting} = offersProcess.actions;
