
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../../components/history-router/history-router';
import LoginForm from './login-form';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const store = mockStore({});

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <LoginForm />
    </HistoryRouter>
  </Provider>
);

describe('Component: LoginForm', () => {
  it('should render correctly', async () => {
    history.push('/login');

    render(fakeApp);

    expect(screen.getByText('E-mail')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.getByText('Sign in')).toBeInTheDocument();

    await act(async () => await userEvent.type(screen.getByTestId('login'), 'cosmos'));
    await act(async () => await userEvent.type(screen.getByTestId('password'), '123456'));

    expect(screen.getByDisplayValue('cosmos')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123456')).toBeInTheDocument();
  });

  it('should dispatch login when user submitted form', async () => {
    history.push('/login');

    render(fakeApp);

    await act(async () => await userEvent.type(screen.getByTestId('login'), 'asd@asd.ru'));
    await act(async () => await userEvent.type(screen.getByTestId('password'), 'asd123'));

    fireEvent.click(screen.getByRole('button'));

    const actions = store.getActions();

    expect(actions[0].type).toBe('user/login/pending');
  });
});
