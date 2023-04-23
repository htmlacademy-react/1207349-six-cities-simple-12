import { render, screen } from '@testing-library/react';
import Map from './map';

describe('Component: Map', () => {
  it('should render correctly', () => {
    render(
      <Map
        city={{
          location: {
            latitude: 0,
            longitude: 0,
            zoom: undefined
          },
          name: ''
        }}
        offers={[]}
        activeCard={null}
        className={''}
      />
    );

    expect(screen.getByTestId('map')).toBeInTheDocument();
  });
});
