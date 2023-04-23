import { render, screen } from '@testing-library/react';
import { makeFakeOffer } from '../../utils/mocks';
import { GALLERY_DISPLAY_COUNT } from '../../const';
import RoomGallery from './room-gallery';

const offer = makeFakeOffer();

describe('Component: RoomGallery', () => {
  it('should render correctly', () => {
    render(
      <RoomGallery images={offer.images} title={offer.title} />
    );

    expect(screen.getAllByRole('img').length).toBe(GALLERY_DISPLAY_COUNT);
  });
});
