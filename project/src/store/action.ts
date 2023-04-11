import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/offer';
import { AppRoute, AuthorizationStatus, SortingOption } from '../const';
import { Offer } from '../types/offer';

export const changeCity = createAction<City>('offers/changeCity');

export const changeSorting = createAction<SortingOption>('offers/changeSorting');

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
