import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { SortingOption } from '../../const';
import Sorting from './sorting';

const mockStore = configureMockStore();
const store = mockStore({
  OFFERS: {sorting: SortingOption.pop}
});

const fakeApp = (
  <Provider store={store}>
    <Sorting />
  </Provider>
);

describe('Component: Sorting', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText(/Sort by/)).toBeInTheDocument();
    expect(screen.getByText('Popular')).toBeInTheDocument();
  });

  it('should change sorting when user clicked to sort and selected new sort', () => {
    render(fakeApp);

    fireEvent.click(screen.getByText('Popular'));

    expect(screen.getByText('Top rated first')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Top rated first'));

    const actions = store.getActions();

    expect(actions[0].type).toBe('OFFERS/changeSorting');
  });
});
