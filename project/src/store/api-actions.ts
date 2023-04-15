import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Offer } from '../types/offer';
import { Review } from '../types/review';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { ReviewData } from '../types/review-data';
import { dropToken, saveToken } from '../services/token';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { loadNearPlacesOffers, loadOffers, loadReviews, loadUser, publishReview, redirectToRoute, requireAuthorization, setOffersDataLoadingStatus } from './action';

function createAsyncThunkTeamplate<ThunkArg = undefined>() {
  return createAsyncThunk<void, ThunkArg, {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }>;
}

export const fetchOffersAction = createAsyncThunkTeamplate()(
  'data/loadOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(loadOffers(data));
  },
);

export const fetchNearPlacesOffersAction = createAsyncThunkTeamplate<number>()(
  'data/loadNearPlacesOffers',
  async (hotelId, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.NearPlacesOffers.replace('{hotelId}', hotelId.toString()));
    dispatch(loadNearPlacesOffers(data));
  },
);

export const fetchReviewsAction = createAsyncThunkTeamplate<number>()(
  'data/loadReviews',
  async (hotelId, {dispatch, extra: api}) => {
    const {data} = await api.get<Review[]>(APIRoute.Reviews.replace('{hotelId}', hotelId.toString()));
    dispatch(loadReviews(data));
  },
);

export const publishReviewAction = createAsyncThunkTeamplate<ReviewData>()(
  'data/publishReviews',
  async ({rating, comment, hotelId}, {dispatch, extra: api}) => {
    const {data} = await api.post<Review[]>(APIRoute.Reviews.replace('{hotelId}', hotelId.toString()), {rating, comment});
    dispatch(publishReview(data));
  },
);

export const checkAuthAction = createAsyncThunkTeamplate()(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      const {data} = await api.get<UserData>(APIRoute.Login);
      dispatch(loadUser(data));
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunkTeamplate<AuthData>()(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(loadUser(data));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const logoutAction = createAsyncThunkTeamplate()(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(loadUser(null));
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(redirectToRoute(AppRoute.Login));
  },
);
