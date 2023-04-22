import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RatingInput from './rating-input';

const fieldChangeHandler = jest.fn();

describe('Component: RatingInput', () => {
  it('should render correctly', () => {
    render(
      <RatingInput
        title={'perfect'}
        count={0}
        currRating={0}
        fieldChangeHandler={fieldChangeHandler}
      />
    );

    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('fieldChangeHandler should called when user choose rating', async () => {
    render(
      <RatingInput
        title={'perfect'}
        count={1}
        currRating={0}
        fieldChangeHandler={fieldChangeHandler}
      />
    );

    expect(screen.getByRole('radio')).not.toBeChecked();

    await userEvent.click(screen.getByRole('radio'));

    expect(fieldChangeHandler).toBeCalled();
  });
});
