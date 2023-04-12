import { ChangeEvent } from 'react';

type RatingInputProps = {
  title: string;
  count: number;
  currRating: number;
  fieldChangeHandler: (evt: ChangeEvent<HTMLInputElement>) => void;
}

function RatingInput({title, count, currRating, fieldChangeHandler}: RatingInputProps): JSX.Element {
  return (
    <>
      <input
        onChange={fieldChangeHandler}
        className="form__rating-input visually-hidden"
        name="rating"
        value={count}
        id={`${count}-stars`}
        type="radio"
        checked={count === Number(currRating)}
      />
      <label
        htmlFor={`${count}-stars`}
        className="reviews__rating-label form__rating-label"
        title={title}
      >
        <svg className="form__star-image" width="37" height="33">
          <use xlinkHref="#icon-star"></use>
        </svg>
      </label>
    </>
  );
}

export default RatingInput;
