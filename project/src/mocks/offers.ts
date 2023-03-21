import { Offer } from '../types/offer';

export const offers: Offer[] = [
  {
    id: 1,
    images: [
      'img/room.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/studio-01.jpg',
      'img/apartment-01.jpg',
    ],
    title: 'Beautiful & luxurious studio at great location',
    description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    isPremium: true,
    type: 'apartment',
    rating: 4.8,
    bedrooms: 3,
    maxAdults: 4,
    price: 120,
    goods: ['Wifi', 'Heating', 'Kitchen', 'Cable TV'],
    host: {
      id: 1,
      avatar: 'img/avatar-angelina.jpg',
      name: 'Angelina',
      isPro: true,
    },
    reviews: [1, 2],
    coordinates: [55.751857, 37.525288],
    city: 'Amsterdam',
  }, {
    id: 2,
    images: [
      'img/apartment-01.jpg',
      'img/room.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/studio-01.jpg',
      'img/apartment-01.jpg',
    ],
    title: '2 Beautiful & luxurious studio at great location',
    description: '2 A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    isPremium: false,
    type: 'room',
    rating: 3.8,
    bedrooms: 2,
    maxAdults: 3,
    price: 90,
    goods: ['Wifi', 'Heating', 'Kitchen'],
    host: {
      id: 2,
      avatar: 'img/avatar-max.jpg',
      name: 'Max',
      isPro: false,
    },
    reviews: [1, 2],
    coordinates: [55.751857, 37.525488],
    city: 'Amsterdam',
  }, {
    id: 3,
    images: [
      'img/studio-01.jpg',
      'img/apartment-03.jpg',
      'img/apartment-01.jpg',
      'img/room.jpg',
      'img/apartment-01.jpg',
      'img/apartment-02.jpg',
    ],
    title: '3 Beautiful & luxurious studio at great location',
    description: '3 A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    isPremium: true,
    type: 'hotel',
    rating: 4.2,
    bedrooms: 5,
    maxAdults: 7,
    price: 190,
    goods: ['Towels', 'Heating', 'Coffee machine', 'Baby seat', 'Wifi', 'Heating', 'Kitchen'],
    host: {
      id: 2,
      avatar: 'img/avatar-max.jpg',
      name: 'Max',
      isPro: false,
    },
    reviews: [1, 2],
    coordinates: [55.711857, 37.525388],
    city: 'Amsterdam',
  }, {
    id: 4,
    images: [
      'img/apartment-01.jpg',
      'img/room.jpg',
      'img/apartment-02.jpg',
      'img/apartment-03.jpg',
      'img/studio-01.jpg',
      'img/apartment-01.jpg',
    ],
    title: '4 Beautiful & luxurious studio at great location',
    description: '4 A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    isPremium: false,
    type: 'house',
    rating: 3.4,
    bedrooms: 2,
    maxAdults: 2,
    price: 80,
    goods: ['Wifi', 'Heating', 'Kitchen',' Washing machine', 'Towels', 'Heating', 'Coffee machine', 'Baby seat'],
    host: {
      id: 1,
      avatar: 'img/avatar-max.jpg',
      name: 'Piter',
      isPro: true,
    },
    reviews: [1],
    coordinates: [55.752857, 37.525188],
    city: 'Amsterdam',
  }
];
