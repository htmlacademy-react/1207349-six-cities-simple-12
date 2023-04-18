import { City } from './types/offer';

export const GALLERY_DISPLAY_COUNT = 6;

export const REVIEWS_DISPLAY_COUNT = 10;

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Offer = '/offer/:id',
}

export enum NameSpace {
  Offers = 'OFFERS',
  Data = 'DATA',
  User = 'USER',
}

export enum APIRoute {
  Offers = '/hotels',
  NearPlacesOffers = '/hotels/{hotelId}/nearby',
  Reviews = '/comments/{hotelId}',
  Login = '/login',
  Logout = '/logout',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum SortingOption {
  pop = 'Popular',
  lth = 'Price: low to high',
  htl = 'Price: high to low',
  top = 'Top rated first',
}

export enum UrlMarker {
  Default = 'img/pin.svg',
  Current = 'img/pin-active.svg',
}

export const RATING_LABELS: string[] = ['perfect', 'good', 'not bad', 'badly', 'terribly'];

export const city: {[key: string]: City} = {
  'Paris': {
    name: 'Paris',
    location: {
      latitude: 48.8534100,
      longitude: 2.3488000,
    }
  },
  'Cologne': {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
    }
  },
  'Brussels': {
    name: 'Brussels',
    location: {
      latitude: 50.8504500,
      longitude: 4.3487800,
    }
  },
  'Amsterdam': {
    name: 'Amsterdam',
    location: {
      latitude: 52.3740300,
      longitude: 4.8896900,
    }
  },
  'Hamburg': {
    name: 'Hamburg',
    location: {
      latitude: 53.5753200,
      longitude: 10.0153400,
    }
  },
  'Dusseldorf': {
    name: 'Dusseldorf',
    location: {
      latitude: 51.2217200,
      longitude: 6.7761600,
    }
  }
};
