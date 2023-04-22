import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import HistoryRouter from '../../components/history-route/history-route';
import { AuthorizationStatus } from '../../const';
import Layout from './layout';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Unknown}
});

describe('Component: Layout', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Layout>
            <p>This is children component</p>
          </Layout>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('This is children component')).toBeInTheDocument();
    expect(screen.getByTestId('link-to-root')).toBeInTheDocument();
  });
});
