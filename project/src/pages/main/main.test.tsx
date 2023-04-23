import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import HistoryRouter from '../../components/history-router/history-router';
import { AuthorizationStatus, city } from '../../const';
import { makeFakeOffers } from '../../utils/mocks';
import Main from './main';

const offers = makeFakeOffers();
const history = createMemoryHistory();
const mockStore = configureMockStore();

function fakeApp(store: MockStore): JSX.Element {
  return (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <Main />
      </HistoryRouter>
    </Provider>
  );
}

describe('Page: Main', () => {
  it('should render correctly', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Unknown},
      OFFERS: {city: city['Cologne']},
      DATA: {offers: []},
    });

    render(fakeApp(store));

    expect(screen.getByText('Cities')).toBeInTheDocument();
  });
  it('should render correctly when no offers', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Unknown},
      OFFERS: {city: city['Cologne']},
      DATA: {offers: []},
    });

    render(fakeApp(store));

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
  });

  it('should render correctly when has offers', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Unknown},
      OFFERS: {city: offers[0].city},
      DATA: {offers: offers},
    });

    render(fakeApp(store));

    expect(screen.getByText('Places')).toBeInTheDocument();
  });
});
