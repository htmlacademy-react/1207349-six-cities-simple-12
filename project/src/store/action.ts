import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/city';

export const changeCity = createAction('offers/changeCity',
  (city: City) => ({
    payload: city,
  })
);
