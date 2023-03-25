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
}

const makeIcon = (iconURL: string):leaflet.Icon => leaflet.icon({
  iconUrl: iconURL,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const defaultCustomIcon = makeIcon(URL_MARKER_DEFAULT);
const currentCustomIcon = makeIcon(URL_MARKER_CURRENT);

function Map({city, offers, activeCard}: MapProps): JSX.Element {
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
    <section className="cities__map map" ref={mapRef} />
  );
}

export default Map;