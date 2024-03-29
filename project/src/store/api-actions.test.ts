import { Action} from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../services/api';
import { checkAuthAction, fetchNearPlacesOffersAction, fetchOffersAction, fetchReviewsAction, loginAction, logoutAction, publishReviewAction } from './api-actions';
import { APIRoute } from '../const';
import { State } from '../types/state';
import { makeFakeOffers, makeFakeReviews } from '../utils/mocks';
import { AuthData } from '../types/auth-data';
import { redirectToRoute } from './action';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action<string>,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch fetchOffersAction when GET /hotels', async () => {
    const offers = makeFakeOffers();
    mockAPI
      .onGet(APIRoute.Offers)
      .reply(200, offers);

    const store = mockStore();

    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchNearPlacesOffersAction when GET /hotels/3/nearby', async () => {
    const offers = makeFakeOffers(3);
    mockAPI
      .onGet(APIRoute.NearPlacesOffers.replace('{hotelId}', '3'))
      .reply(200, offers);

    const store = mockStore();

    await store.dispatch(fetchNearPlacesOffersAction(3));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchNearPlacesOffersAction.pending.type,
      fetchNearPlacesOffersAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchReviewsAction when GET /comments/4', async () => {
    const reviews = makeFakeReviews();
    mockAPI
      .onGet(APIRoute.Reviews.replace('{hotelId}', '4'))
      .reply(200, reviews);

    const store = mockStore();

    await store.dispatch(fetchReviewsAction(4));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type
    ]);
  });

  it('should dispatch publishReviewAction when POST /comments/5', async () => {
    const reviews = makeFakeReviews();
    mockAPI
      .onPost(APIRoute.Reviews.replace('{hotelId}', '5'))
      .reply(200, reviews);

    const store = mockStore();

    await store.dispatch(publishReviewAction({rating: 3, comment: 'string', hotelId: 5}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      publishReviewAction.pending.type,
      publishReviewAction.fulfilled.type
    ]);
  });

  it('should dispatch loginAction when GET /login', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should dispatch loginAction and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = {login: 'test@test.ru', password: '123abc'};

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'secret'});


    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', 'secret');
  });

  it('should dispatch logoutAction when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      redirectToRoute.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
  });
});
