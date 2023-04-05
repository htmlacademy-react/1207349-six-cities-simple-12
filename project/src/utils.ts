import { Offer } from './types/offer';
import { SORTING_OPTIONS } from './const';

export const sortingOffers = (offers: Offer[], type: string) => {
  switch (type) {
    case SORTING_OPTIONS.lth:
      offers.sort((a, b) => a.price - b.price);
      break;
    case SORTING_OPTIONS.htl:
      offers.sort((a, b) => b.price - a.price);
      break;
    case SORTING_OPTIONS.top:
      offers.sort((a, b) => b.rating - a.rating);
      break;
  }

  return offers;
};
