import { renderHook } from '@testing-library/react';
import { city } from '../const';
import useMap from './use-map';

const mockRef = {
  current: document.createElement('div')
};

describe('Hook: useMap', () => {
  it('should render correctly', () => {
    const {result} = renderHook(
      () => useMap(mockRef, city['Paris'])
    );

    const mapInstance = result.current;

    expect(mapInstance).not.toBeNull();
  });
});
