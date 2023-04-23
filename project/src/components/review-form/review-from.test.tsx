import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RequestStatus } from '../../const';
import ReviewForm from './review-form';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  DATA: {reviews: []}
});

const fakeApp = (
  <Provider store={store}>
    <ReviewForm offerId={5}/>
  </Provider>
);

describe('Component: ReviewForm', () => {
  it('should render correctly', async () => {
    render(fakeApp);

    expect(screen.getByText('Your review')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();

    await act(async () => await userEvent.type(screen.getByTestId('comment'), 'Lorem comment'));

    expect(screen.getByDisplayValue('Lorem comment')).toBeInTheDocument();
  });

  it('should render correctly when comment length less 50', async () => {
    render(fakeApp);

    await act(async () => await userEvent.type(screen.getByTestId('comment'), 'Lorem comment'));

    expect(screen.getByText('50 characters')).toBeInTheDocument();
    expect(screen.getByText(/least/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should render correctly when comment length more 50 but less 300', async () => {
    render(fakeApp);

    await act(async () => await userEvent.type(screen.getByTestId('comment'), 'x'.repeat(55)));

    expect(screen.getByText('50 characters')).toBeInTheDocument();
    expect(screen.getByText(/least/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).not.toBeDisabled();
  });

  it('should render correctly when comment length more 300', async () => {
    render(fakeApp);

    await act(async () => await userEvent.type(screen.getByTestId('comment'), 'x'.repeat(305)));

    expect(screen.getByText('300 characters')).toBeInTheDocument();
    expect(screen.getByText(/most/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('should render correctly when publishReviewsStatus === PENDING', () => {
    render(
      <Provider
        store={
          mockStore({
            DATA: {reviews: [], reviewsPublishStatus: RequestStatus.Pending}
          })
        }
      >
        <ReviewForm offerId={5}/>
      </Provider>
    );

    expect(screen.getByRole('button', {name: 'Loading'})).toBeDisabled();
  });

  it('should dispatch publish Review when user submitted form', async () => {
    render(fakeApp);

    await act(async () => await userEvent.type(screen.getByTestId('comment'), 'x'.repeat(55)));
    await act(async () => await userEvent.click(screen.getAllByRole('radio')[0]));

    fireEvent.click(screen.getByRole('button'));

    const actions = store.getActions();

    expect(actions[0].type).toBe('data/publishReviews/pending');
  });
});
