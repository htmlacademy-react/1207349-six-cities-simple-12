import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RatingInput from './rating-input';

const onChange = jest.fn();

describe('Component: RatingInput', () => {
  it('should render correctly', () => {
    render(
      <RatingInput
        title={'perfect'}
        count={0}
        currRating={0}
        onChange={onChange}
      />
    );

    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('onChange should called when user choose rating', async () => {
    render(
      <RatingInput
        title={'perfect'}
        count={1}
        currRating={0}
        onChange={onChange}
      />
    );

    expect(screen.getByRole('radio')).not.toBeChecked();

    await userEvent.click(screen.getByRole('radio'));

    expect(onChange).toBeCalled();
  });
});
