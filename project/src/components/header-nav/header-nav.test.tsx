import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-router/history-router';
import { AuthorizationStatus, AppRoute } from '../../const';
import { makeFakeUser } from '../../utils/mocks';
import HeaderNav from './header-nav';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const user = makeFakeUser();

function fakeApp(store: MockStore): JSX.Element {
  return (
    <Provider store={store}>
      <HistoryRouter history={history}>
        <HeaderNav />
      </HistoryRouter>
    </Provider>
  );
}

describe('Component: HeaderNav', () => {
  it('should render correctly', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Unknown}
    });

    render(fakeApp(store));

    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('should render correctly when user is logged', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth, user: {email: 'asd@asd.ru'}}
    });

    render(fakeApp(store));

    expect(screen.getByText('asd@asd.ru')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('should render correctly when user is not logged', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NoAuth}
    });

    render(fakeApp(store));

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should redirect to login when user clicked to Sign in', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NoAuth}
    });

    history.push('/fake');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Login}
              element={<h1>This is login page</h1>}
            />
            <Route
              path="*"
              element={<HeaderNav />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText('This is login page')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('link'));

    expect(screen.getByText('This is login page')).toBeInTheDocument();
  });

  it('should dispatch logout when user clicked to Sign out', async () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth, user}
    });

    render(fakeApp(store));

    await userEvent.click(screen.getByRole('link'));

    const actions = store.getActions();

    expect(actions[0].type).toBe('user/logout/pending');
  });
});
