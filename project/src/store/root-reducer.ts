import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { offersProcess } from './offers-process/offers-process';
import { offersData } from './offers-data/offers-data';
import { userProcess } from './user-processe/user-process';

export const rootReducer = combineReducers({
  [NameSpace.Offers]: offersProcess.reducer,
  [NameSpace.Data]: offersData.reducer,
  [NameSpace.User]: userProcess.reducer,
});
