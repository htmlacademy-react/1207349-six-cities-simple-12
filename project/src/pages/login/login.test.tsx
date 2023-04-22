import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import HistoryRouter from '../../components/history-route/history-route';
import { AuthorizationStatus, city } from '../../const';
import Login from './login';

const history = createMemoryHistory();
const mockStore = configureMockStore();

describe('Page: Login', () => {
  it('should render correctly', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Unknown},
      OFFERS: {city: city['Hamburg']}
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
    expect(screen.getByText('Hamburg')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should redirect to root when user clicked to link', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Unknown},
      OFFERS: {city: city['Hamburg']}
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

    fireEvent.click(screen.getByText('Hamburg'));

    expect(screen.getByText('This is root page')).toBeInTheDocument();
  });

  it('should redirect to root when user auth', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
      OFFERS: {city: city['Hamburg']}
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