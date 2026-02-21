import { Map, Source, Layer } from '@vis.gl/react-maplibre';
import { useEffect, useRef, useState } from 'react';
import type { MapRef } from '@vis.gl/react-maplibre';


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

export default function LiveBusMap() {
  const mapRef = useRef<MapRef | null>(null);

  const [routeCoords, setRouteCoords] = useState<Record<number, number[][]>>({});
  const [liveCoords, setLiveCoords] = useState<Record<number, number[]>>({});
  const [visibleRoutes, setVisibleRoutes] = useState<Record<number, number[][]>>({});

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

  // 🔹 WebSocket for all buses
  useEffect(() => {
  if (Object.keys(routeCoords).length === 0) return;

  const socket = new WebSocket('ws://localhost:5000');

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const { routeId, coord } = data;

    // Use functional update to ensure fresh state
    setLiveCoords(prev => ({ ...prev, [routeId]: coord }));

    // Use latest routeCoords
    const coords = routeCoords[routeId];
    if (coords) {
      const closestIndex = findClosestIndex(coords, coord);
      const slicedRoute = coords.slice(closestIndex);

      setVisibleRoutes(prev => ({ ...prev, [routeId]: slicedRoute }));
    }
  };

  return () => socket.close();
}, [routeCoords]); // depend on routeCoords to re-run when it's loaded


  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: 80.220347,
        latitude: 13.032283,
        zoom: 15
      }}
      mapStyle="/styles/removed bus stops.json"
    >
      {/* Render each bus route and live point */}
      {Object.entries(visibleRoutes).map(([routeId, coords]) => (
        <Source
          key={`route-${routeId}`}
          id={`route-${routeId}`}
          type="geojson"
          data={{
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              geometry: { type: 'LineString', coordinates: coords }
            }]
          }}
        >
          <Layer
            id={`route-layer-${routeId}`}
            type="line"
            paint={{
              'line-color': '#ff0000',
              'line-width': 4,
              'line-opacity': 1
            }}
          />
        </Source>
      ))}

      {Object.entries(liveCoords).map(([routeId, coord]) => (
        <Source
          key={`bus-${routeId}`}
          id={`bus-${routeId}`}
          type="geojson"
          data={{
            type: 'FeatureCollection',
            features: [{
              type: 'Feature',
              geometry: { type: 'Point', coordinates: coord }
            }]
          }}
        >
          <Layer
            id={`bus-layer-${routeId}`}
            type="circle"
            paint={{
              'circle-radius': 6,
              'circle-color': '#56D2C3',
              'circle-stroke-width': 2,
              'circle-stroke-color': '#fff'
            }}
          />
        </Source>
      ))}
    </Map>
  );
}
