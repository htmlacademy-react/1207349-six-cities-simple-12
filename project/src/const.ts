import { City } from './types/city';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Offer = '/offer/:id',
}

export const RATING_LABELS: string[] = ['perfect', 'good', 'not bad', 'badly', 'terribly'];

export const CITIES: City[] = [
  {
    title: 'Paris',
    lat: 48.8534100,
    lng: 2.3488000,
  }, {
    title: 'Cologne',
    lat: 45.5786200,
    lng: 9.9418000,
  }, {
    title: 'Brussels',
    lat: 50.8504500,
    lng: 4.3487800,
  }, {
    title: 'Amsterdam',
    lat: 52.3740300,
    lng: 4.8896900,
  }, {
    title: 'Hamburg',
    lat: 53.5753200,
    lng: 10.0153400,
  }, {
    title: 'Dusseldorf',
    lat: 51.2217200,
    lng: 6.7761600,
  }
];

export const URL_MARKER_DEFAULT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT = 'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';
