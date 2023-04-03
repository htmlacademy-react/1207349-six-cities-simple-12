import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import { City } from '../../types/city';
import { Offer } from '../../types/offer';
import useMap from '../../hooks/useMap';

type MapProps = {
  city: City;
  offers: Offer[];
  activeCard: number | null;
  className: string;
}

const makeIcon = (iconURL: string):leaflet.Icon => leaflet.icon({
  iconUrl: iconURL,
  iconSize: [27, 39],
  iconAnchor: [27, 39],
});

const defaultCustomIcon = makeIcon(URL_MARKER_DEFAULT);
const currentCustomIcon = makeIcon(URL_MARKER_CURRENT);

function Map({city, offers, activeCard, className}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.coordinates[0],
            lng: offer.coordinates[1],
          }, {
            icon: (offer.id === activeCard)
              ? currentCustomIcon
              : defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, offers, activeCard]);

  return (
    <section className={`map ${className}`} ref={mapRef} />
  );
}

export default Map;
