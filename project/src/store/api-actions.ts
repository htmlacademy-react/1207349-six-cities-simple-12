import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Offer } from '../types/offer';
import { Review } from '../types/review';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { ReviewData } from '../types/review-data';
import { dropToken, saveToken } from '../services/token';
import { APIRoute, AppRoute } from '../const';
import { redirectToRoute } from './action';

function createAsyncThunkTeamplate<Returned = void, ThunkArg = undefined>() {
  return createAsyncThunk<Returned, ThunkArg, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>;
}

export const fetchOffersAction = createAsyncThunkTeamplate<Offer[]>()(
  'data/loadOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);

    return data;
  },
);

export const fetchNearPlacesOffersAction = createAsyncThunkTeamplate<Offer[], number>()(
  'data/loadNearPlacesOffers',
  async (hotelId, {extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.NearPlacesOffers.replace('{hotelId}', hotelId.toString()));

    return data;
  },
);

export const fetchReviewsAction = createAsyncThunkTeamplate<Review[], number>()(
  'data/loadReviews',
  async (hotelId, {extra: api}) => {
    const {data} = await api.get<Review[]>(APIRoute.Reviews.replace('{hotelId}', hotelId.toString()));

    return data;
  },
);

export const publishReviewAction = createAsyncThunkTeamplate<Review[], ReviewData>()(
  'data/publishReviews',
  async ({rating, comment, hotelId}, {extra: api}) => {
    const {data} = await api.post<Review[]>(APIRoute.Reviews.replace('{hotelId}', hotelId.toString()), {rating, comment});

    return data;
  },
);

export const checkAuthAction = createAsyncThunkTeamplate<UserData>()(
  'user/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);

    return data;
  },
);

export const loginAction = createAsyncThunkTeamplate<UserData, AuthData>()(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Root));

    return data;
  },
);

export const logoutAction = createAsyncThunkTeamplate()(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(redirectToRoute(AppRoute.Login));
  },
);
