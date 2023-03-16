import { Review } from '../types/review';

export const reviews: Review[] = [
  {
    id: 1,
    user: {
      id: 1,
      avatar: 'img/avatar-angelina.jpg',
      name: 'Angelina',
    },
    rating: 5,
    date: 'Thu Mar 16 2023 16:33:11 GMT+0300 (Москва, стандартное время)',
    textReview: 'An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.'
  },
  {
    id: 2,
    user: {
      id: 2,
      avatar: 'img/avatar-max.jpg',
      name: 'Max',
    },
    rating: 4,
    date: 'Mon Apr 01 2019 03:00:00 GMT+0300 (Москва, стандартное время)',
    textReview: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.'
  },

];
