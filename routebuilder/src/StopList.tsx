import { Stop } from "./Routebuilder";

interface StopListProps {
  typedStops: Stop[];
}

export default function StopList({ typedStops }: StopListProps) {
  return (
    <div
      style={{
        flex: 1,
        padding: "24px",
        overflowY: "auto",
        maxHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
        {typedStops.map((stop, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "32px",
              position: "relative",
            }}
          >
            {idx !== typedStops.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  left: "6px",
                  top: "20px",
                  width: "2px",
                  height: "56px",
                  background: "#d1d5db",
                }}
              ></div>
            )}
            <div
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                border: "2px solid #d1d5db",
                background: "#fff",
                marginRight: "16px",
                zIndex: 10,
              }}
            ></div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <span style={{ color: "#000", fontSize: "16px" }}>{stop.name}</span>
              <span style={{ color: "#6b7280", fontSize: "15px" }}>{stop.arrivalTime}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}