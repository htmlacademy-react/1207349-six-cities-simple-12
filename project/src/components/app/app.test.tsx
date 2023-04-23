import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-router/history-router';
import { AuthorizationStatus, AppRoute, SortingOption, city } from '../../const';
import { makeFakeOffers } from '../../utils/mocks';
import App from './app';

const offers = makeFakeOffers(1);

const history = createMemoryHistory();
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  OFFERS: {city: city['Paris'], sorting: SortingOption.pop},
  DATA: {reviews: [], offers: offers, nearPlacesOffers: []},
  USER: {authorizationStatus: AuthorizationStatus.Unknown},
});

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render Main page when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByRole('heading', {name: 'Cities'})).toBeInTheDocument();
  });

  it('should render Login page when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeApp);

    expect(screen.getByRole('heading', {name: 'Sign in'})).toBeInTheDocument();
  });

  it('should render Room page when user navigate to "/offer"', () => {
    history.push(AppRoute.Offer.replace(':id', offers[0].id.toString()));

    render(fakeApp);

    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
  });

  it('should render Not found page when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });
});
