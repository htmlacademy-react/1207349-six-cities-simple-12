import { render, screen } from '@testing-library/react';
import Loading from './loading';

describe('Page: Loading', () => {
  it('should render correctly', () => {
    render(<Loading />);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
