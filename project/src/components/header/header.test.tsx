import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import HistoryRouter from '../history-route/history-route';
import { AuthorizationStatus, AppRoute } from '../../const';
import Header from './header';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  USER: {authorizationStatus: AuthorizationStatus.Unknown}
});

describe('Component: Header', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('link-to-root')).toBeInTheDocument();
  });

  it('should render correctly in login page', () => {
    history.push('/login');

    render(
      <HistoryRouter history={history}>
        <Routes>
          <Route
            path={AppRoute.Login}
            element={<Header />}
          />
        </Routes>
      </HistoryRouter>
    );

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('should render correctly in others page', () => {
    history.push('/');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<Header />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('should redirect to root when user clicked to link', () => {
    history.push('/fake');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path="/"
              element={<h1>This is root page</h1>}
            />
            <Route
              path="*"
              element={<Header />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText('This is root page')).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId('link-to-root'));

    expect(screen.getByText('This is root page')).toBeInTheDocument();
  });
});
