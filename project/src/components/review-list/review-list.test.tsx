import { render, screen } from '@testing-library/react';
import { makeFakeReviews } from '../../utils/mocks';
import ReviewList from './review-list';

const reviews = makeFakeReviews();

describe('Component: ReviewList', () => {
  it('should render correctly', () => {
    render(
      <ReviewList reviews={reviews} />
    );

    expect(screen.getByText(/ReviewList/i)).toBeInTheDocument();
    expect(screen.getAllByRole('img').length).toBe(reviews.length);
  });
});
