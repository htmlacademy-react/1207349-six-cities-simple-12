import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import HistoryRouter from '../../components/history-route/history-route';
import { AuthorizationStatus } from '../../const';
import NotFound from './not-found';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Unknown}
});

describe('Page: NotFound', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <NotFound />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByText(/Go to home/i)).toBeInTheDocument();
  });
});
