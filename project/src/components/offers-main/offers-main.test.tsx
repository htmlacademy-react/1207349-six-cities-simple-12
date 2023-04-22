import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-route/history-route';
import { SortingOption, city } from '../../const';
import { makeFakeOffers } from '../../utils/mocks';
import OffersMain from './offers-main';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  OFFERS: {
    sorting: SortingOption.pop,
  },
});

const offers = makeFakeOffers(3);

describe('Component: OffersMain', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <OffersMain offers={offers} selectedCity={city['Brussels']} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Places')).toBeInTheDocument();
    expect(screen.getByText('Popular')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    offers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
    });
  });
});
