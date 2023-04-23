import { useEffect, useRef } from 'react';
import leaflet, { Marker } from 'leaflet';
import { DEFAULT_MAP_ZOOM, UrlMarker } from '../../const';
import { City } from '../../types/offer';
import { Offer } from '../../types/offer';
import useMap from '../../hooks/use-map';

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
    const markers = leaflet.layerGroup();
    if (map) {
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });

        marker.setIcon(offer.id === activeCard ? currentCustomIcon : defaultCustomIcon);
        marker.addTo(markers);
      });
      markers.addTo(map);
    }

    return (() => {
      markers.clearLayers();
    });
  }, [map, offers, activeCard]);

  useEffect(() => {
    if (map) {
      map.setView([city.location.latitude, city.location.longitude], city.location.zoom ?? DEFAULT_MAP_ZOOM);
    }
  }, [map, city]);

  return (
    <section className={`map ${className}`} ref={mapRef} data-testid="map" />
  );
}

export default Map;
