import { datatype, internet } from 'faker';
import { UserData } from '../types/user-data';

export const makeFakeUser = (): UserData => ({
  avatarUrl: internet.avatar(),
  email: internet.email(),
  id: datatype.number(10),
  isPro: datatype.boolean(),
  name: internet.userName(),
  token: datatype.uuid(),
} as UserData);
