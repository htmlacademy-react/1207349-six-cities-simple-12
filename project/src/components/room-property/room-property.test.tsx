import { Provider } from 'react-redux';
import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { AuthorizationStatus } from '../../const';
import { makeFakeOffer, makeFakeReviews } from '../../utils/mocks';
import RoomProperty from './room-property';

const mockStore = configureMockStore();
const reviews = makeFakeReviews();
const offer = makeFakeOffer();
const {title, rating, type, bedrooms, maxAdults, price, goods} = offer;

function fakeApp(store: MockStore): JSX.Element {
  return (
    <Provider store={store}>
      <RoomProperty offer={offer} />
    </Provider>
  );
}

describe('Component: RoomProperty', () => {
  it('should render correctly', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Unknown},
      DATA: {reviews: []}
    });

    render(fakeApp(store));

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(rating)).toBeInTheDocument();
    expect(screen.getByText(type)).toBeInTheDocument();
    expect(screen.getByText(`${bedrooms} Bedrooms`)).toBeInTheDocument();
    expect(screen.getByText(`Max ${maxAdults} adults`)).toBeInTheDocument();
    expect(screen.getByText(`€${price}`)).toBeInTheDocument();
    expect(screen.getByText('Meet the host')).toBeInTheDocument();
    goods.forEach((good) => {
      expect(screen.getByText(good)).toBeInTheDocument();
    });
  });

  it('should render correctly when premium offer', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Unknown},
      DATA: {reviews: []}
    });

    offer.isPremium = true;

    render(fakeApp(store));

    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('should render correctly when no premium offer', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Unknown},
      DATA: {reviews: []}
    });

    offer.isPremium = false;

    render(fakeApp(store));

    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('should render correctly with AUTH', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
      DATA: {reviews: []}
    });

    render(fakeApp(store));

    expect(screen.getByText('Your review')).toBeInTheDocument();
  });

  it('should render correctly with NO_AUTH', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.NoAuth},
      DATA: {reviews: []}
    });

    render(fakeApp(store));

    expect(screen.queryByText('Your review')).not.toBeInTheDocument();
  });

  it('should render correctly when has reviews', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Unknown},
      DATA: {reviews: reviews}
    });

    render(fakeApp(store));

    expect(screen.getByText(/ReviewList/)).toBeInTheDocument();
  });

  it('should render correctly when no reviews', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Unknown},
      DATA: {reviews: []}
    });

    render(fakeApp(store));

    expect(screen.queryByText(/ReviewList/)).not.toBeInTheDocument();
  });
});
