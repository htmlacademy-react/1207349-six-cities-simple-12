import { SortingOption, city } from '../../const';
import { OffersProcess } from '../../types/state';
import { changeCity, changeSorting, offersProcess } from './offers-process';

describe('Reducer: offersProcess', () => {
  let state: OffersProcess;

  beforeEach(() => {
    state = {
      city: city['Paris'],
      sorting: SortingOption.pop,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(offersProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({city: city['Paris'], sorting: SortingOption.pop});
  });

  it('should have change city', () => {
    expect(offersProcess.reducer(state, changeCity(city['Amsterdam'])))
      .toEqual({city: city['Amsterdam'], sorting: SortingOption.pop});

    expect(offersProcess.reducer(state, changeCity(city['Hamburg'])))
      .toEqual({city: city['Hamburg'], sorting: SortingOption.pop});
  });

  it('should have change sorting', () => {
    expect(offersProcess.reducer(state, changeSorting(SortingOption.htl)))
      .toEqual({city: city['Paris'], sorting: SortingOption.htl});

    expect(offersProcess.reducer(state, changeSorting(SortingOption.top)))
      .toEqual({city: city['Paris'], sorting: SortingOption.top});
  });
});
