import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import HistoryRouter from '../../components/history-router/history-router';
import { city } from '../../const';
import Tabs from './tabs';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  OFFERS: {city: city['Paris']}
});

describe('Component: Tabs', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Tabs />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Cities')).toBeInTheDocument();
    expect(screen.getAllByRole('link').length).toBe(6);
  });
});
