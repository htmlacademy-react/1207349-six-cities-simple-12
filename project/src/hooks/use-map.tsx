import { useEffect, useRef, useState, MutableRefObject } from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { City } from '../types/offer';
import { DEFAULT_MAP_ZOOM } from '../const';

function useMap(mapRef: MutableRefObject<HTMLElement | null>, city: City) {
  const [map, setMap] = useState<leaflet.Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = leaflet.map(mapRef.current, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom ?? DEFAULT_MAP_ZOOM,
      });

      leaflet
        .tileLayer(
          'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
        )
        .addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
}

export default useMap;
