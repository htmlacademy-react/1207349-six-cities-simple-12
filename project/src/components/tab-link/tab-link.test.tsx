import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../../components/history-router/history-router';
import { city } from '../../const';
import TabLink from './tab-link';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  OFFERS: {city: city['Paris']}
});

describe('Component: TabLink', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <TabLink city={city['Paris']} selectedCity={'Cologne'} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
  });

  it('should change city when user clicked to link', async () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <TabLink city={city['Cologne']} selectedCity={'Paris'} />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByRole('link'));

    const actions = store.getActions();

    expect(actions[0].type).toBe('OFFERS/changeCity');
  });
});
