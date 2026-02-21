// App.tsx
import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';

function findClosestIndex(coords: number[][], target: number[]): number {
  let closestIndex = 0;
  let minDist = Infinity;

  for (let i = 0; i < coords.length; i++) {
    const [lng, lat] = coords[i];
    const dist = Math.hypot(lng - target[0], lat - target[1]);
    if (dist < minDist) {
      minDist = dist;
      closestIndex = i;
    }
  }

  return closestIndex;
}

// ✅ Helper to smoothly interpolate between two positions
function interpolatePosition(start: number[], end: number[], t: number): number[] {
  return [
    start[0] + (end[0] - start[0]) * t,
    start[1] + (end[1] - start[1]) * t,
  ];
}

export default function Map() {
  const mapRef = useRef<maplibregl.Map | null>(null);
  const mapContainer = useRef<HTMLDivElement | null>(null);

  const [routeCoords, setRouteCoords] = useState<Record<number, number[][]>>({});

  // 🔹 Load all 19 routes once
  useEffect(() => {
    const fetchAllRoutes = async () => {
      const routeData: Record<number, number[][]> = {};
      for (let i = 1; i <= 19; i++) {
        const res = await fetch(`http://localhost:5001/api/route/${i}`);
        if (res.ok) {
          const data = await res.json();
          routeData[data.routeId] = data.coordinates;
        }
      }
      setRouteCoords(routeData);
    };

    fetchAllRoutes();
  }, []);

  // 🔹 Initialize map once
  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new maplibregl.Map({
      container: mapContainer.current,
      style: '/styles/removed bus stops.json',
      center: [80.240753, 12.92165],
      zoom: 14,
    });

    mapRef.current = map;

    map.on('load', async () => {
      try {
        const img = new Image();
        img.src = '/assets/bus-icon.png'; // ✅ Make sure this path is correct
        img.crossOrigin = 'anonymous';

        img.onload = () => {
          if (!map.hasImage('bus-icon')) {
            map.addImage('bus-icon', img);
            console.log('✅ Bus icon added');
          }

          // 🔻 ADD STATIC DESTINATION MARKER HERE 🔻
          map.addSource('destination-point', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [{
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [80.240753, 12.92165],
                },
              }],
            },
          });

          map.addLayer({
            id: 'destination-layer',
            type: 'circle',
            source: 'destination-point',
            paint: {
              'circle-radius': 6,
              'circle-color': '#2d934dff',
              'circle-stroke-width': 2,
              'circle-stroke-color': '#FFFFFF',
            },
          });
        };

        img.onerror = (err) => {
          console.error('❌ Failed to load bus icon image', err);
        };
      } catch (err) {
        console.error('❌ Unexpected error loading icon:', err);
      }
    });

    return () => map.remove();
  }, []);

  // 🔹 WebSocket: live updates
  useEffect(() => {
    if (!mapRef.current || Object.keys(routeCoords).length === 0) return;

    const map = mapRef.current;
    const socket = new WebSocket('ws://localhost:5001');

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      const { routeId, coord } = data;

      const coords = routeCoords[routeId];
      if (!coords) return;

      const closestIndex = findClosestIndex(coords, coord);
      const slicedRoute = coords.slice(closestIndex);

      // ✅ Route Layer
      const routeSourceId = `route-${routeId}`;
      const routeLayerId = `route-layer-${routeId}`;

      const routeGeoJSON = {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: slicedRoute,
          },
        }],
      };

      if (map.getSource(routeSourceId)) {
        (map.getSource(routeSourceId) as maplibregl.GeoJSONSource).setData(routeGeoJSON);
      } else {
        map.addSource(routeSourceId, {
          type: 'geojson',
          data: routeGeoJSON,
        });

        map.addLayer({
          id: routeLayerId,
          type: 'line',
          source: routeSourceId,
          paint: {
            'line-color': '#5C5C5C',
            'line-width': 4,
            'line-opacity': 0.9,
          },
        });
      }

      // ✅ Bus Live Location Layer with smooth animation
      const busSourceId = `bus-${routeId}`;
      const busLayerId = `bus-layer-${routeId}`;
      const busSource = map.getSource(busSourceId) as maplibregl.GeoJSONSource | undefined;

      if (!busSource) {
        map.addSource(busSourceId, {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: coord,
              },
            }],
          },
        });

        map.addLayer({
          id: busLayerId,
          type: 'symbol',
          source: busSourceId,
          layout: {
            'icon-image': 'bus-icon',
            'icon-size': 0.5,
            'icon-allow-overlap': true,
          },
        });
      } else {
        const currentData = (busSource as any)._data;
        const prev = currentData.features[0].geometry.coordinates as number[];
        const next = coord;

        let startTime: number | null = null;
        const duration = 1000; // ms

        const animate = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const interpolated = interpolatePosition(prev, next, progress);

          busSource.setData({
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              geometry: { type: 'Point', coordinates: interpolated },
            }],
          });

          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
      }
    };

    return () => socket.close();
  }, [routeCoords]);

  return (
    <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
  );
}
