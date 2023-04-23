import { GALLERY_DISPLAY_COUNT } from '../../const';

type RoomGalleryProps = {
  images: string[];
  title: string;
}

function RoomGallery({images, title}: RoomGalleryProps): JSX.Element {
  return (
    <div className="property__gallery-container container">
      <div className="property__gallery">
        {images.slice(0, GALLERY_DISPLAY_COUNT).map((image, i) => {
          const key = `${image}-${i}`;

          return (
            <div key={key} className="property__image-wrapper">
              <img className="property__image" src={image} alt={title} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RoomGallery;
