import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import HistoryRouter from './history-router';

describe('Component: HistoryRouter', () => {
  const history = createMemoryHistory();

  it('renders without error', () => {
    render(<HistoryRouter history={history} />);
  });


  it('should correct location in router', () => {
    history.push('/location');

    render(
      <HistoryRouter history={history}>
        <p>This is children component</p>
      </HistoryRouter>
    );

    expect(screen.getByText('This is children component')).toBeInTheDocument();

    expect(history.location.pathname).toEqual('/location');
  });
});
