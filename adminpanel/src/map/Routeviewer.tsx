// Map.tsx
import { useEffect, useRef, useState } from "react";
import { Map, MapRef, Source, Layer } from "@vis.gl/react-maplibre";
import maplibregl, { Marker } from "maplibre-gl";

type Stop = {
  coords: [number, number];
  name: string;
  arrivalTime?: string;
};

interface MapProps {
  stops: Stop[];
  routeGeoJson: any;
}

const middleOfChennai: [number, number] = [80.21926734476244,
        12.992037474061291];

export default function MapComponent({ stops, routeGeoJson }: MapProps) {
  const mapRef = useRef<MapRef>(null);
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current.getMap();

    // clear old markers
    markers.forEach((m) => m.remove());
    setMarkers([]);

    const newMarkers: Marker[] = [];

    function createMarker(coords: [number, number], label: string, type: "first" | "last" | "mid") {
      let marker: Marker;

      if (type === "mid") {
        const el = document.createElement("div");
        el.style.width = "14px";
        el.style.height = "14px";
        el.style.backgroundColor ="green";
        el.style.borderRadius = "50%";
        el.style.border = "2px solid white";
        marker = new maplibregl.Marker({ element: el }).setLngLat(coords).addTo(map);

        const popup = new maplibregl.Popup({ closeButton: false, offset: 20 }).setText(label);
        el.addEventListener("mouseenter", () => popup.setLngLat(coords).addTo(map));
        el.addEventListener("mouseleave", () => popup.remove());
      } else {
        marker = new maplibregl.Marker({ color: "green" }).setLngLat(coords).addTo(map);
        const popup = new maplibregl.Popup({ closeButton: false, offset: 25 }).setText(label);
        marker.getElement().addEventListener("mouseenter", () => popup.setLngLat(coords).addTo(map));
        marker.getElement().addEventListener("mouseleave", () => popup.remove());
      }

      return marker;
    }

    if (stops.length > 0) {
      newMarkers.push(createMarker(stops[0].coords, `${stops[0].name} (${stops[0].arrivalTime || ""})`, "first"));
    }

    if (stops.length > 2) {
      stops.slice(1, -1).forEach((s) => {
        newMarkers.push(createMarker(s.coords, `${s.name} (${s.arrivalTime || ""})`, "mid"));
      });
    }

    if (stops.length > 1) {
      const last = stops[stops.length - 1];
      newMarkers.push(createMarker(last.coords, `${last.name} (${last.arrivalTime || ""})`, "last"));
    }

    setMarkers(newMarkers);
  }, [stops]);

  return (
    <Map
      ref={mapRef}
      mapLib={maplibregl}
      initialViewState={{
        longitude: middleOfChennai[0],
        latitude: middleOfChennai[1],
        zoom: 11,
      }}
      style={{ width: "100%", height: "100%" }}
      mapStyle='/styles/removed bus stops.json'
      onLoad={() => {
    // force re-run of marker placement after map is loaded
    if (stops.length) {
      setMarkers([]); // clear
      // trigger effect again by forcing state change or move marker logic here
    }
  }}
    >
      {routeGeoJson && (
        <Source id="ors-route" type="geojson" data={routeGeoJson}>
          <Layer
            id="route-line"
            type="line"
            paint={{
              "line-color": "#061b53ff",
              "line-width": 6,
            }}
          />
        </Source>
      )}
    </Map>
  );
}
