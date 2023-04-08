import { Offer } from './types/offer';
import { SortingOption } from './const';

export const sortingOffers = (offers: Offer[], type: string) => {
  switch (type) {
    case SortingOption.lth:
      offers.sort((a, b) => a.price - b.price);
      break;
    case SortingOption.htl:
      offers.sort((a, b) => b.price - a.price);
      break;
    case SortingOption.top:
      offers.sort((a, b) => b.rating - a.rating);
      break;
  }

  return offers;
};
