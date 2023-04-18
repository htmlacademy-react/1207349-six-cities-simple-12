import { Offer } from './types/offer';
import { SortingOption } from './const';
import { Review } from './types/review';

export const sortingOffers = (offers: Offer[], type: string): Offer[] => {
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

export const sortingReviews = (reviews: Review[]): Review[] => {
  reviews.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    return Math.sign(dateB - dateA);
  });

  return reviews;
};
