import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import HistoryRouter from '../../components/history-router/history-router';
import { AuthorizationStatus } from '../../const';
import Login from './login';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Page: Login', () => {
  it('should render correctly', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Unknown}
    });

    history.push('/login');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={'/login'}
              element={<Login />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('heading', {name: 'Sign in'})).toBeInTheDocument();
    expect(screen.getByTestId('login-city-link')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should redirect to root and change city when user clicked to link', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Unknown}
    });

    history.push('/login');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path="/"
              element={<h1>This is root page</h1>}
            />
            <Route
              path={'/login'}
              element={<Login />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText('This is root page')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('login-city-link'));

    expect(screen.getByText('This is root page')).toBeInTheDocument();

    const actions = store.getActions();

    expect(actions[0].type).toBe('OFFERS/changeCity');
  });

  it('should redirect to root when user auth', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth}
    });

    history.push('/login');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path="/"
              element={<h1>This is root page</h1>}
            />
            <Route
              path={'/login'}
              element={<Login />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('This is root page')).toBeInTheDocument();
  });
});
