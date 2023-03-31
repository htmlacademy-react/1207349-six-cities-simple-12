import { Review } from '../../types/review';
import { format } from 'date-fns';

type ReviewItemProps = {
  review: Review;
}

function ReviewItem({review}:ReviewItemProps): JSX.Element {
  const {user, rating, date, textReview} = review;
  const dateObj = new Date(date);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={user.avatar} width="54" height="54" alt={user.name} />
        </div>
        <span className="reviews__user-name">
          {user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${Math.round(rating) * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{textReview}</p>
        <time className="reviews__time" dateTime={format(dateObj, 'yyyy-MM-dd')}>
          {format(dateObj, 'MMMM yyyy')}
        </time>
      </div>
    </li>
  );
}

export default ReviewItem;
