import { Provider } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HistoryRouter from '../history-router/history-router';
import { AppRoute } from '../../const';
import { makeFakeOffer } from '../../utils/mocks';
import Card from './card';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore();
const offer = makeFakeOffer();
const {title, type, price, id} = offer;

describe('Component: Card', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Card offer={offer} cardType={'cities__places-list tabs__content'} />
      </HistoryRouter>
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(type)).toBeInTheDocument();
    expect(screen.getByText(`€${price}`)).toBeInTheDocument();
    expect(screen.getAllByRole('link')).toHaveLength(2);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('should render correctly with isPremiun === true', () => {
    offer.isPremium = true;

    render(
      <HistoryRouter history={history}>
        <Card offer={offer} cardType={''} />
      </HistoryRouter>
    );

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should render correctly with isPremiun === false', () => {
    offer.isPremium = false;

    render(
      <HistoryRouter history={history}>
        <Card offer={offer} cardType={''} />
      </HistoryRouter>
    );

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('should redirect to room when user clicked to link', () => {
    history.push('/');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<Card offer={offer} cardType={''} />}
            />
            <Route
              path={AppRoute.Offer.replace(':id', id.toString())}
              element={<h1>This is room page</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText('This is room page')).not.toBeInTheDocument();

    fireEvent.click(screen.getAllByRole('link')[0]);

    expect(screen.getByText('This is room page')).toBeInTheDocument();
  });

  it('should change active card when user hovered to link', async () => {
    const hoverHandler = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Card offer={offer} cardType={'cities__places-list tabs__content'} setActiveCard={hoverHandler} />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.hover(screen.getAllByRole('link')[0]);
    await userEvent.hover(screen.getAllByRole('link')[1]);

    expect(hoverHandler).toBeCalledTimes(2);
  });
});
