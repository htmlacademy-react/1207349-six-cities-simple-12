import { createAction } from '@reduxjs/toolkit';
import { City } from '../types/offer';
import { Offer } from '../types/offer';
import { Review } from '../types/review';
import { UserData } from '../types/user-data';
import { AppRoute, AuthorizationStatus, SortingOption } from '../const';

export const changeCity = createAction<City>('offers/changeCity');

export const changeSorting = createAction<SortingOption>('offers/changeSorting');

export const loadOffers = createAction<Offer[]>('data/loadOffers');

export const loadNearPlacesOffers = createAction<Offer[]>('data/loadNearPlacesOffers');

export const loadReviews = createAction<Review[]>('data/loadReviews');

export const publishReview = createAction<Review[]>('data/publishReviews');

export const loadUser = createAction<UserData | null>('data/loadUser');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');
