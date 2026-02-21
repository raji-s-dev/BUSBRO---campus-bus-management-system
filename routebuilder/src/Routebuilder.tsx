import { useRef, useState, useEffect } from "react";
import { Map, MapRef, Source, Layer } from "@vis.gl/react-maplibre";
import maplibregl, { MapMouseEvent, Marker } from "maplibre-gl";

const middleOfChennai: [number, number] = [
  80.23875912488421,
  12.920902421858244,
];
const ORS_API_KEY =
  "eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6Ijk2Y2U4YWIzNjAzNjRlMzk5M2ViNDYyOGI5MTk3ODYyIiwiaCI6Im11cm11cjY0In0=";

type LngLat = [number, number];

export type Stop = {
  coords: LngLat;
  name: string;
  etaMinutes?: number;
  arrivalTime?: string;   // formatted for display
  rawStartTime?: string;  // internal 24h "HH:MM"
};

type Props = {
  stops: Stop[];
  setStops: React.Dispatch<React.SetStateAction<Stop[]>>;
};

export default function Routebuilder({ stops, setStops }: Props) {
  const mapRef = useRef<MapRef>(null);

  
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [routeGeoJson, setRouteGeoJson] = useState<any>(null);

  const [viaMarkers, setViaMarkers] = useState<maplibregl.Marker[]>([]);


  // No-Stop mode and per-leg shaping points
  const [nostopMode, setNostopMode] = useState(false);
  // viaByLeg[i] holds shaping points between stop i and stop i+1
  const [viaByLeg, setViaByLeg] = useState<LngLat[][]>([]);

  // ---- Refs to avoid stale closures in map click handler ----
  const nostopModeRef = useRef(nostopMode);
  const stopsRef = useRef(stops);
  const viaByLegRef = useRef(viaByLeg);

  const [searchQuery, setSearchQuery] = useState("");
const [searchMarker, setSearchMarker] = useState<maplibregl.Marker | null>(null);

const [suggestions, setSuggestions] = useState<any[]>([]);
const [showSuggestions, setShowSuggestions] = useState(false);



  useEffect(() => { nostopModeRef.current = nostopMode; }, [nostopMode]);
  useEffect(() => { stopsRef.current = stops; }, [stops]);
  useEffect(() => { viaByLegRef.current = viaByLeg; }, [viaByLeg]);
  // Remove green search marker on ESC key
useEffect(() => {
  const escHandler = (e: KeyboardEvent) => {
    if (e.key === "Escape" && searchMarker) {
      searchMarker.remove();
      setSearchMarker(null);
    }
  };
  window.addEventListener("keydown", escHandler);
  return () => window.removeEventListener("keydown", escHandler);
}, [searchMarker]);

  // -----------------------------------------------------------

  function formatTime(date: Date) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }



// Reverse geocode: coords -> human-readable address
async function reverseGeocode(coords: LngLat): Promise<string> {
  const url = `https://api.openrouteservice.org/geocode/reverse?api_key=${ORS_API_KEY}&point.lon=${coords[0]}&point.lat=${coords[1]}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data?.features?.length > 0) {
      return data.features[0].properties.label as string;
    }
  } catch (err) {
    console.error("Reverse geocode failed", err);
  }

  // fallback
  return `Dropped Pin (${coords[1].toFixed(5)}, ${coords[0].toFixed(5)})`;
}


// Forward geocode: place name -> coords
async function forwardGeocode(query: string) {
  const url = `https://api.openrouteservice.org/geocode/search?api_key=${ORS_API_KEY}&text=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data?.features ?? [];
  } catch (err) {
    console.error("Forward geocode failed", err);
    return [];
  }
}

// Autocomplete: partial text -> suggestions
async function autocompleteGeocode(query: string) {
  if (!query.trim()) {
    setSuggestions([]);
    return;
  }

  const url = `https://api.openrouteservice.org/geocode/autocomplete?api_key=${ORS_API_KEY}&text=${encodeURIComponent(
    query
  )}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    setSuggestions(data?.features ?? []);
    setShowSuggestions(true);
  } catch (err) {
    console.error("Autocomplete failed", err);
    setSuggestions([]);
  }
}


// Handle search form submission

async function handleSearch(e: React.FormEvent) {
  e.preventDefault();
  if (!searchQuery.trim() || !mapRef.current) return;

  const results = await forwardGeocode(searchQuery.trim());
  if (results.length === 0) return;

  const coords: LngLat = results[0].geometry.coordinates;
  const label: string = results[0].properties.label;

  // remove old marker if exists
  if (searchMarker) searchMarker.remove();

 // create a custom green marker element with a flag
const el = document.createElement("div");
el.style.width = "24px";
el.style.height = "24px";
el.style.backgroundColor = "green";
el.style.borderRadius = "50%";
el.style.cursor = "pointer";
// mark it so we can detect clicks later
el.dataset.role = "search-marker";

const newMarker = new maplibregl.Marker({ element: el })
  .setLngLat(coords)
  .setPopup(
    new maplibregl.Popup().setHTML(`
      <div style="font-size:14px;">
        <b>${label}</b><br/>
        <button id="addStopBtn" style="margin-top:5px;padding:3px 6px;background:#007AFF;color:white;border:none;border-radius:4px;cursor:pointer;">Add as Stop</button>
        <button id="cancelSearchBtn" style="margin-top:5px;margin-left:4px;padding:3px 6px;background:#ccc;border:none;border-radius:4px;cursor:pointer;">Cancel</button>
      </div>
    `)
  )
  .addTo(mapRef.current.getMap());


  setSearchMarker(newMarker);

  mapRef.current.flyTo({ center: coords, zoom: 15 });

  // hook up popup buttons
  newMarker.getPopup().on("open", () => {
    const addBtn = document.getElementById("addStopBtn");
    const cancelBtn = document.getElementById("cancelSearchBtn");

    if (addBtn) {
      addBtn.onclick = () => {
        // same flow as map click
        let stopName = label;
        const override = prompt("Enter stop name (optional):", label);
        if (override === null) return;
        stopName = override.trim() || label;

        setStops((prev) => {
          const newStops = [...prev, { coords, name: stopName }];

          // start time prompt if first stop
          if (newStops.length === 1) {
            const startTimeStr = prompt("Enter start time (HH:MM, 24h format)", "07:00");
            if (startTimeStr) {
              newStops[0].rawStartTime = startTimeStr;
              const [h, m] = startTimeStr.split(":").map(Number);
              const base = new Date();
              base.setHours(h, m, 0, 0);
              newStops[0].arrivalTime = formatTime(base);
            }
          }

          // maintain viaByLeg consistency
          setViaByLeg((prevVia) => {
            const nextVia = prevVia.slice(0, Math.max(0, newStops.length - 1));
            if (newStops.length - 2 >= 0 && !nextVia[newStops.length - 2]) {
              nextVia[newStops.length - 2] = [];
            }
            recomputeRoute(newStops, nextVia);
            return nextVia;
          });

          return newStops;
        });

        newMarker.remove();
        setSearchMarker(null);
      };
    }

    if (cancelBtn) {
      cancelBtn.onclick = () => {
        newMarker.remove();
        setSearchMarker(null);
      };
    }
  });
}



  // Snap point to nearest road using ORS /snap
  async function snapToRoad(coords: LngLat) {
    const url = "https://api.openrouteservice.org/v2/snap/driving-car";
    const body = { coordinates: [coords] };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ORS_API_KEY,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (data?.features?.length > 0) {
        return data.features[0].geometry.coordinates as LngLat;
      }
    } catch (err) {
      console.error("Snap failed, using original coords", err);
    }

    return coords; // fallback
  }

  // Recompute entire route from stops + viaByLeg (also compute ETAs)
  async function recomputeRoute(newStops: Stop[], newViaByLeg?: LngLat[][]) {
    const viaLegs = newViaByLeg ?? viaByLegRef.current;

    if (newStops.length < 2) {
      setRouteGeoJson(null);
      return;
    }

    let allCoords: LngLat[] = [];
    let baseTime: Date | null = null;

    if (newStops[0].rawStartTime) {
      const [h, m] = newStops[0].rawStartTime.split(":").map(Number);
      baseTime = new Date();
      baseTime.setHours(h, m, 0, 0);
    }

    for (let i = 0; i < newStops.length - 1; i++) {
      const segmentVia = viaLegs[i] ?? [];
      const coordsList: LngLat[] = [newStops[i].coords, ...segmentVia, newStops[i + 1].coords];

      const url = "https://api.openrouteservice.org/v2/directions/driving-car/geojson";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ORS_API_KEY,
        },
        body: JSON.stringify({ coordinates: coordsList }),
      });

      const data = await res.json();
      const segment: LngLat[] = data.features[0].geometry.coordinates;
      const duration: number = data.features[0].properties.summary.duration; // seconds

      // avoid repeating joint node
      if (i === 0) allCoords.push(...(segment as LngLat[]));
      else allCoords.push(...(segment.slice(1) as LngLat[]));

      if (baseTime) {
        const trafficFactor = 2.5; // your chosen factor
        const adjustedDuration = duration * trafficFactor;
        const etaMinutes = Math.round(adjustedDuration / 60);
        newStops[i + 1].etaMinutes = etaMinutes;

        baseTime = new Date(baseTime.getTime() + etaMinutes * 60000);
        newStops[i + 1].arrivalTime = formatTime(baseTime);
      }
    }

    setRouteGeoJson({
      type: "Feature",
      geometry: { type: "LineString", coordinates: allCoords },
    });

    setStops([...newStops]); // update state with updated timings
  }

  // Rebuild stop markers (first, intermediate, last)
  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current.getMap();

    // clear old markers
    markers.forEach((m) => m.remove());
    setMarkers([]);

    const newMarkers: Marker[] = [];

    // default pin marker with popup
    function createDefaultMarker(coords: LngLat, label: string) {
      const marker = new maplibregl.Marker({ color: "red" })
        .setLngLat(coords)
        .addTo(map);

      const popup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 25,
      }).setText(label);

      marker.getElement().addEventListener("mouseenter", () => {
        popup.setLngLat(coords).addTo(map);
      });
      marker.getElement().addEventListener("mouseleave", () => {
        popup.remove();
      });

      return marker;
    }




    
    

    // circle marker with popup (for intermediates)
    function createCircleMarker(coords: LngLat, label: string) {
      const el = document.createElement("div");
      el.style.width = "16px";
      el.style.height = "16px";
      el.style.backgroundColor = "red";
      el.style.borderRadius = "50%";
      el.style.border = "2px solid white";
      el.style.cursor = "pointer";

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(coords)
        .addTo(map);

      const popup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 20,
      }).setText(label);

      el.addEventListener("mouseenter", () => {
        popup.setLngLat(coords).addTo(map);
      });
      el.addEventListener("mouseleave", () => {
        popup.remove();
      });

      return marker;
    }

    // first stop
    if (stops.length > 0) {
      const label = `${stops[0].name} (${stops[0].arrivalTime || ""})`;
      newMarkers.push(createDefaultMarker(stops[0].coords, label));
    }

    // intermediate stops
    if (stops.length > 2) {
      const interStops = stops.slice(1, -1);
      interStops.forEach((s) => {
        const label = `${s.name} (${s.arrivalTime || ""})`;
        newMarkers.push(createCircleMarker(s.coords, label));
      });
    }

    // last stop
    if (stops.length > 1) {
      const last = stops[stops.length - 1];
      const label = `${last.name} (${last.arrivalTime || ""})`;
      newMarkers.push(createDefaultMarker(last.coords, label));
    }

    setMarkers(newMarkers);
  }, [stops]);



  // effect 2: rebuild via markers (blue points)
useEffect(() => {
  if (!mapRef.current) return;

  viaMarkers.forEach((m) => m.remove());
  setViaMarkers([]);

  const newMarkers: maplibregl.Marker[] = [];
  viaByLeg.forEach((leg) => {
    leg.forEach((coords) => {
      const el = document.createElement("div");
      el.style.width = "10px";
      el.style.height = "10px";
      el.style.backgroundColor = "blue";
      el.style.borderRadius = "50%";

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(coords)
        .addTo(mapRef.current!.getMap());

      newMarkers.push(marker);
    });
  });

  setViaMarkers(newMarkers);
}, [viaByLeg, stops]);




  // map load
  const handleMapLoad = () => {
    if (!mapRef.current) return;
    const map = mapRef.current.getMap();

    const clickHandler = async (e: MapMouseEvent) => {

      // Ignore clicks on the green search marker
if ((e.originalEvent.target as HTMLElement)?.dataset?.role === "search-marker") {
  return;
}


      const rawCoords: LngLat = [e.lngLat.lng, e.lngLat.lat];
      const snappedCoords = await snapToRoad(rawCoords);

      // Read the latest states from refs to avoid stale closure
      const isNoStop = nostopModeRef.current;
      const currentStops = stopsRef.current;
      const currentVia = viaByLegRef.current;

      if (isNoStop) {
        // You can only shape a leg if there's a starting stop already
        if (currentStops.length === 0) {
          console.warn("Add a starting stop first, then shape the route.");
          return;
        }

        const legIdx = currentStops.length - 1; // shaping between last stop and the next stop
        const updatedVia = currentVia.map((arr) => [...arr]);
        updatedVia[legIdx] = [...(updatedVia[legIdx] ?? []), snappedCoords];

        setViaByLeg(updatedVia);
        createViaPointMarker(snappedCoords);
        await recomputeRoute(currentStops, updatedVia);
        return;
      }

      // Normal stop creation with reverse geocode as default name
let stopName = await reverseGeocode(snappedCoords);
const override = prompt("Enter stop name (optional):", stopName);
if (override === null) return; // user cancelled
stopName = override.trim() || stopName;


      setStops((prevStops) => {
        const newStops = [...prevStops, { coords: snappedCoords, name: stopName }];

        // Ask start time for the first stop
        if (newStops.length === 1) {
          const startTimeStr = prompt("Enter start time (HH:MM, 24h format)", "07:00");
          if (startTimeStr) {
            newStops[0].rawStartTime = startTimeStr;
            const [h, m] = startTimeStr.split(":").map(Number);
            const base = new Date();
            base.setHours(h, m, 0, 0);
            newStops[0].arrivalTime = formatTime(base);
          }
        }

        // Ensure viaByLeg length matches number of legs (stops-1)
        setViaByLeg((prevVia) => {
          const nextVia = prevVia.slice(0, Math.max(0, newStops.length - 1));
          // make sure there's an array for the just-closed leg if user had shaped it already
          if (newStops.length - 2 >= 0 && !nextVia[newStops.length - 2]) {
            nextVia[newStops.length - 2] = [];
          }
          // recompute with per-leg vias
          recomputeRoute(newStops, nextVia);
          return nextVia;
        });

        return newStops;
      });
    };

    map.on("click", clickHandler);

    // optional cleanup on unmount
    return () => {
      map.off("click", clickHandler);
    };
  };

  // undo last stop
  const handleUndo = () => {
    if (stops.length === 0) return;

    const newStops = [...stops];
    newStops.pop();

    // Remove shaping points for the last leg as well
    const updatedVia = viaByLeg.slice(0, Math.max(0, newStops.length - 1));

    setStops(newStops);
    setViaByLeg(updatedVia);
    recomputeRoute(newStops, updatedVia);
  };

  // export stops + route (unchanged)
  const handleExport = () => {
    const exportData = { stops, route: routeGeoJson || null };
    if (stops.length === 0) return;

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bus-route.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  function createViaPointMarker(coords: [number, number]) {
  const el = document.createElement("div");
  el.style.width = "10px";
  el.style.height = "10px";
  el.style.backgroundColor = "blue";
  el.style.borderRadius = "50%";

  const marker = new maplibregl.Marker({ element: el })
    .setLngLat(coords)
    .addTo(mapRef.current!.getMap());

  // keep track of it
  setViaMarkers((prev) => [...prev, marker]);

  return marker;
}



  return (
    
      <div style={{ position: "relative" , height: "100vh"}}>

      <Map
        ref={mapRef}
        mapLib={maplibregl}
        initialViewState={{
          longitude: middleOfChennai[0],
          latitude: middleOfChennai[1],
          zoom: 16,
        }}
         style={{ width: "100%", height: "100%" }} // fill wrapper
        mapStyle='/styles/removed bus stops.json'
        onLoad={handleMapLoad}
      >
        {routeGeoJson && (
          <Source id="ors-route" type="geojson" data={routeGeoJson}>
            <Layer
              id="route-line"
              type="line"
              paint={{
                "line-color": "#061b53ff",
                "line-width": 9,
              }}
            />
          </Source>
        )}
      </Map>


{/* Search bar */}
<form
  onSubmit={handleSearch}
  style={{
    position: "absolute",
    top: 10,
    left: 10,
    background: "white",
    padding: "6px",
    borderRadius: "6px",
    boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
    display: "flex",
    gap: "6px",
  }}
>
  <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => {
  const val = e.target.value;
  setSearchQuery(val);

  if (val.trim() === "" && searchMarker) {
    searchMarker.remove();
    setSearchMarker(null);
  }

  autocompleteGeocode(val); // fetch suggestions
}}
onFocus={() => {
  if (suggestions.length > 0) setShowSuggestions(true);
}}
onBlur={() => {
  // small delay so click registers before hiding
  setTimeout(() => setShowSuggestions(false), 150);
}}

      placeholder="Search place..."
      style={{
        padding: "6px 28px 6px 8px", // extra right padding for ❌
        border: "1px solid #ccc",
        borderRadius: "4px",
        minWidth: "200px",
      }}
    />


    {showSuggestions && suggestions.length > 0 && (
  <ul
    style={{
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      background: "white",
      border: "1px solid #ccc",
      borderRadius: "4px",
      marginTop: "2px",
      maxHeight: "200px",
      overflowY: "auto",
      zIndex: 1000,
      listStyle: "none",
      padding: 0,
    }}
  >
    {suggestions.map((s, idx) => (
      <li
        key={idx}
        onMouseDown={async () => {
  setSearchQuery(s.properties.label);
  setSuggestions([]);
  setShowSuggestions(false);
  await handleSearch(new Event("submit") as any); // trigger search immediately
}}

        style={{
          padding: "6px 8px",
          cursor: "pointer",
        }}
        onMouseEnter={(e) =>
          ((e.target as HTMLElement).style.background = "#f0f0f0")
        }
        onMouseLeave={(e) =>
          ((e.target as HTMLElement).style.background = "transparent")
        }
      >
        {s.properties.label}
      </li>
    ))}
  </ul>
)}



    {searchQuery && (
      <button
        type="button"
        onClick={() => {
          if (searchMarker) {
           try { searchMarker.remove(); } catch {}
  setSearchMarker(null);
          }
          setSearchQuery("");
        }}
        style={{
          position: "absolute",
          right: "6px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
          color: "#666",
        }}
      >
        ✕
      </button>
    )}
  </div>

  <button
    type="submit"
    style={{
      background: "#007AFF",
      color: "white",
      border: "none",
      borderRadius: "4px",
      padding: "6px 12px",
      cursor: "pointer",
    }}
  >
    Go
  </button>
</form>


      {/* Export button */}
      <button
        onClick={handleExport}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          padding: "10px 16px",
          background: "#007AFF",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Export Route
      </button>

      {/* Undo button */}
      <button
        onClick={handleUndo}
        style={{
          position: "absolute",
          top: 60,
          right: 10,
          padding: "10px 16px",
          background: "#FF3B30",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Undo
      </button>

      {/* Toggle No-Stop Mode */}
      <button
        onClick={() => setNostopMode(!nostopMode)}
        style={{
          position: "absolute",
          top: 110,
          right: 10,
          padding: "10px 16px",
          background: nostopMode ? "#FFA500" : "#8E8E93",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {nostopMode ? "No-Stop Mode ON" : "No-Stop Mode OFF"}
      </button>
    </div>

    
    
  );
}
