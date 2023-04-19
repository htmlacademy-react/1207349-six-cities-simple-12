import { NameSpace, SortingOption } from '../../const';
import { City } from '../../types/offer';
import { State } from '../../types/state';

export const getCity = (state: State): City => state[NameSpace.Offers].city;
export const getSorting = (state: State): SortingOption => state[NameSpace.Offers].sorting;
