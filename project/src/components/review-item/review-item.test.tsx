import { render, screen } from '@testing-library/react';
import { format } from 'date-fns';
import { makeFakeReview } from '../../utils/mocks';
import ReviewItem from './review-item';

const review = makeFakeReview();
const dateObj = new Date(review.date);

describe('Component: ReviewItem', () => {
  it('should render correctly', () => {
    render(
      <ReviewItem review={review} />
    );

    expect(screen.getByText(review.comment)).toBeInTheDocument();
    expect(screen.getByText(review.user.name)).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText(format(dateObj, 'MMMM yyyy'))).toBeInTheDocument();
  });
});
