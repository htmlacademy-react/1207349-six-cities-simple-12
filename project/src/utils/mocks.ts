import { address, company, datatype, date, image, internet, random } from 'faker';
import { UserData } from '../types/user-data';
import { Offer } from '../types/offer';
import { lorem } from 'faker';
import { Review } from '../types/review';

export const makeFakeUser = (): UserData => ({
  avatarUrl: internet.avatar(),
  email: internet.email(),
  id: datatype.number(),
  isPro: datatype.boolean(),
  name: internet.userName(),
  token: datatype.uuid(),
} as UserData);

export const makeFakeOffer = (): Offer => ({
  bedrooms: datatype.number(5),
  city: {
    name: address.cityName(),
    location: {
      latitude: Number(address.latitude()),
      longitude: Number(address.latitude()),
    }
  },
  description: lorem.paragraph(),
  goods: new Array(datatype.number(5)).fill(null).map(() => random.words()),
  host: {
    id: datatype.number(),
    avatarUrl: internet.avatar(),
    name: internet.userName(),
    isPro: datatype.boolean(),
  },
  id: datatype.number(),
  images: new Array(datatype.number({min: 6, max: 10})).fill(null).map(() => image.city()),
  isPremium: datatype.boolean(),
  location: {
    latitude: Number(address.latitude()),
    longitude: Number(address.latitude()),
  },
  maxAdults: datatype.number(10),
  previewImage: image.city(),
  price: datatype.number(),
  rating: datatype.number(5),
  title: company.companyName(),
  type: random.word(),
} as Offer);

export const makeFakeOffers = (quantity?: number): Offer[] =>
  new Array(quantity ?? datatype.number({min: 1, max: 10})).fill(null).map(() => makeFakeOffer());

export const makeFakeReview = (): Review => ({
  id: datatype.number(),
  user: {
    avatarUrl: internet.avatar(),
    id: datatype.number(),
    isPro: datatype.boolean(),
    name: internet.userName(),
  },
  rating: datatype.number(5),
  date: date.past().toDateString(),
  comment: lorem.paragraph(3),
} as unknown as Review);

export const makeFakeReviews = (quantity?: number): Review[] =>
  new Array(quantity ?? datatype.number({min: 1, max: 10})).fill(null).map(() => makeFakeReview());
