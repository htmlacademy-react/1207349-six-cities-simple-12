import { City } from './types/offer';

export const DEFAULT_MAP_ZOOM = 10;

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

export enum RequestStatus {
  Idle = 'IDLE',
  Pending = 'PENDING',
  Fulfilled = 'FULFILLED',
  Rejected = 'REJECTED',
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
  Pop = 'Popular',
  Lth = 'Price: low to high',
  Htl = 'Price: high to low',
  Top = 'Top rated first',
}

export enum UrlMarker {
  Default = 'img/pin.svg',
  Current = 'img/pin-active.svg',
}

export enum DisplayCount {
  Gallery = 6,
  Reviews = 10,
}

export enum CommentLength {
  Min = 50,
  Max = 300,
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
