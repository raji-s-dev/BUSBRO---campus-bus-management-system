import Routebuilder from "./Routebuilder";
import StopList from "./StopList";
import { Stop } from "./Routebuilder"; // <-- re-export Stop type if needed
import { useState } from "react";

export default function App() {
  const [stops, setStops] = useState<Stop[]>([]);

  return (
    <div  style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
      }}>
      {/* Left: Map */}
       <div style={{
          flex: "0 0 70%",
          position: "relative",
          height: "100vh",
        }}>
        <Routebuilder stops={stops} setStops={setStops} />
      </div>

      {/* Right: Stop list */}
      <div  style={{
          flex: "0 0 30%",
          background: "#f8fafc",
          borderLeft: "1px solid #d1d5db",
          height: "100vh",
          overflowY: "auto",
        }}>
        <StopList typedStops={stops} />
      </div>
    </div>
  );
}
