import { useState, ChangeEvent, FormEvent, memo } from 'react';
import { CommentLength, RATING_LABELS, RequestStatus } from '../../const';
import RatingInput from '../rating-input/rating-input';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { publishReviewAction } from '../../store/api-actions';
import { getReviewsPublishStatus } from '../../store/offers-data/selectors';

type ReviewFormProps = {
  offerId: number;
}

function ReviewForm({offerId}: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const publishReviewsStatus = useAppSelector(getReviewsPublishStatus);

  const [formData, setFormData] = useState({
    rating: 0,
    comment: '',
    hotelId: offerId,
  });

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(publishReviewAction(formData));
    setFormData({
      rating: 0,
      comment: '',
      hotelId: offerId,
    });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATING_LABELS.map((title, i, arr) => (
          <RatingInput
            key={title}
            count={arr.length - i}
            title={title}
            currRating={formData.rating}
            onChange={handleInputChange}
          />
        ))}
      </div>
      <textarea
        onChange={handleInputChange}
        disabled={publishReviewsStatus === RequestStatus.Pending}
        className="reviews__textarea form__textarea"
        id="comment"
        value={formData.comment}
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
        required
        data-testid="comment"
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at&nbsp;
          {formData.comment.length > CommentLength.Max ? 'most' : 'least'}&nbsp;
          {formData.comment.length > CommentLength.Max
            ? <b className="reviews__text-amount">{CommentLength.Max} characters</b>
            : <b className="reviews__text-amount">{CommentLength.Min} characters</b>}.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={publishReviewsStatus === RequestStatus.Pending || formData.comment.length < CommentLength.Min || formData.comment.length > CommentLength.Max}
        >
          {publishReviewsStatus === RequestStatus.Pending ? 'Loading' : 'Submit'}
        </button>
      </div>
    </form>
  );
}

export default memo(ReviewForm);
