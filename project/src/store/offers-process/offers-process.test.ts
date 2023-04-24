import { SortingOption, city } from '../../const';
import { OffersProcess } from '../../types/state';
import { changeCity, changeSorting, offersProcess } from './offers-process';

describe('Reducer: offersProcess', () => {
  let state: OffersProcess;

  beforeEach(() => {
    state = {
      city: city['Paris'],
      sorting: SortingOption.Pop,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(offersProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({city: city['Paris'], sorting: SortingOption.Pop});
  });

  it('should have change city', () => {
    expect(offersProcess.reducer(state, changeCity(city['Amsterdam'])))
      .toEqual({city: city['Amsterdam'], sorting: SortingOption.Pop});

    expect(offersProcess.reducer(state, changeCity(city['Hamburg'])))
      .toEqual({city: city['Hamburg'], sorting: SortingOption.Pop});
  });

  it('should have change sorting', () => {
    expect(offersProcess.reducer(state, changeSorting(SortingOption.Htl)))
      .toEqual({city: city['Paris'], sorting: SortingOption.Htl});

    expect(offersProcess.reducer(state, changeSorting(SortingOption.Top)))
      .toEqual({city: city['Paris'], sorting: SortingOption.Top});
  });
});
