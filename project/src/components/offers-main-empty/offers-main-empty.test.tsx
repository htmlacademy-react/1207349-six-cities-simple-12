import { render, screen } from '@testing-library/react';
import { city } from '../../const';
import OffersMainEmpty from './offers-main-empty';

describe('Component: OffersMainEmpty', () => {
  it('should render correctly', () => {
    render(
      <OffersMainEmpty selectedCity={city['Brussels']} />
    );

    expect(screen.getByText('No places to stay available')).toBeInTheDocument();
    expect(screen.getByText(/Brussels/i)).toBeInTheDocument();
  });
});
