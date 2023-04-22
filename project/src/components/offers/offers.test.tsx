import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import HistoryRouter from '../history-route/history-route';
import { makeFakeOffers } from '../../utils/mocks';
import Offers from './offers';

const history = createMemoryHistory();
const offers = makeFakeOffers(3);

describe('Component: Offers', () => {
  it('should render correctly', () => {
    render(
      <HistoryRouter history={history}>
        <Offers offers={offers} className={''} cardType={''} />
      </HistoryRouter>
    );

    offers.forEach((offer) => {
      expect(screen.getByText(offer.title)).toBeInTheDocument();
    });
  });
});
