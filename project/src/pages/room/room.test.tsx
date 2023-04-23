import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { AppRoute, AuthorizationStatus, GALLERY_DISPLAY_COUNT } from '../../const';
import { makeFakeOffers } from '../../utils/mocks';
import Room from './room';
import HistoryRouter from '../../components/history-router/history-router';
import { Route, Routes } from 'react-router-dom';

const history = createMemoryHistory();
const offers = makeFakeOffers(1);
const nearPlacesOffers = makeFakeOffers(3);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

function fakeApp(store: MockStore): JSX.Element {
  return (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <Routes>
          <Route path={'/offer/:id'} element={<Room />} />
        </Routes>
      </HistoryRouter>
    </Provider>
  );
}

describe('Page: Room', () => {
  it('should render correctly', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Unknown},
      DATA: {reviews: [], offers: offers, nearPlacesOffers: nearPlacesOffers}
    });

    history.push(AppRoute.Offer.replace(':id', offers[0].id.toString()));

    render(fakeApp(store));

    expect(screen.getByText('Other places in the neighbourhood')).toBeInTheDocument();
    expect(screen.getByText('What\'s inside')).toBeInTheDocument();
    expect(screen.getAllByAltText(offers[0].title).length).toBe(GALLERY_DISPLAY_COUNT);
    expect(screen.getByTestId('map')).toBeInTheDocument();
    nearPlacesOffers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
    });
  });

  it('should display not found when no offers', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Unknown},
      DATA: {reviews: [], offers: [], nearPlacesOffers: []}
    });

    history.push('/offer/5');

    render(fakeApp(store));

    expect(screen.queryByText('Other places in the neighbourhood')).not.toBeInTheDocument();
    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });
});
