import { useEffect, useRef } from 'react';
import leaflet from 'leaflet';
import { UrlMarker } from '../../const';
import { City } from '../../types/offer';
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

const defaultCustomIcon = makeIcon(UrlMarker.Default);
const currentCustomIcon = makeIcon(UrlMarker.Current);

function Map({city, offers, activeCard, className}: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      offers.forEach((offer) => {
        leaflet
          .marker({
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          }, {
            icon: (offer.id === activeCard)
              ? currentCustomIcon
              : defaultCustomIcon,
          })
          .addTo(map);
      });
    }
  }, [map, offers, activeCard]);

  useEffect(() => {
    if (map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom ?? 10);
    }
  }, [map, city]);

  return (
    <section className={`map ${className}`} ref={mapRef} data-testid="map" />
  );
}

export default Map;
