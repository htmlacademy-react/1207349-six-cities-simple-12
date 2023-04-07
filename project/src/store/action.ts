import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city';
import { SortingOption } from '../const';

export const changeCity = createAction('offers/changeCity',
  (city: City) => ({
    payload: city,
  })
);

export const changeSorting = createAction('offers/changeSorting',
  (sorting: SortingOption) => ({
    payload: sorting,
  })
);
