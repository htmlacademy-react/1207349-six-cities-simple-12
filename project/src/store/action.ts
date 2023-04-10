import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/offer';
import { SortingOption } from '../const';
import { Offer } from '../types/offer';

export const changeCity = createAction<City>('offers/changeCity');

export const changeSorting = createAction<SortingOption>('offers/changeSorting');

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
