import { useState, ChangeEvent, FormEvent, memo } from 'react';
import { RATING_LABELS } from '../../const';
import RatingInput from '../rating-input/rating-input';
import { useAppDispatch } from '../../hooks';
import { publishReviewAction } from '../../store/api-actions';

type ReviewFormProps = {
  offerId: number;
}

function ReviewForm({offerId}: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    rating: 0,
    comment: '',
    hotelId: offerId,
  });

  const fieldChangeHandler = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };

  const formSubmitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(publishReviewAction(formData));
    setFormData({
      rating: 0,
      comment: '',
      hotelId: offerId,
    });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={formSubmitHandler}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {RATING_LABELS.map((title, i, arr) => (
          <RatingInput
            key={title}
            count={arr.length - i}
            title={title}
            currRating={formData.rating}
            fieldChangeHandler={fieldChangeHandler}
          />
        ))}
      </div>
      <textarea
        onChange={fieldChangeHandler}
        className="reviews__textarea form__textarea"
        id="comment"
        value={formData.comment}
        name="comment"
        placeholder="Tell how was your stay, what you like and what can be improved"
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit">Submit</button>
      </div>
    </form>
  );
}

export default memo(ReviewForm);
