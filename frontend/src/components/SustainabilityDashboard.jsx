import { useEffect, useState } from "react";
import { getAnalytics } from "../services/api";

export default function SustainabilityDashboard({ mode }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAnalytics(mode).then(result => {
      setData(result);
      setLoading(false);
    });
  }, [mode]);

  if (loading) return <p>Loading...</p>;

  // Simulated monthly trends
  const reportedTrend = [5, 8, 12, 15, 18, 20];
  const resolvedTrend = [3, 6, 10, 13, 16, 18];
  const savingsTrend = mode === 'Campus' ? [60, 120, 200, 280, 380, 480] : [20, 45, 90, 150, 220, 310];
  
  const heatmapData = mode === 'Campus' 
    ? [
        { location: 'Block A', issues: 12, color: '#d32f2f' },
        { location: 'Block B', issues: 8, color: '#f9a825' },
        { location: 'Block C', issues: 4, color: '#fdd835' },
      ]
    : [
        { location: 'Building A', issues: 10, color: '#d32f2f' },
        { location: 'Building B', issues: 6, color: '#f9a825' },
        { location: 'Building C', issues: 2, color: '#fdd835' },
      ];

  return (
    <div style={{ padding: "20px", backgroundColor: "#e8f5e8", minHeight: "100vh" }}>
      <h2>Sustainability Performance Dashboard</h2>
      <h3>{mode} Mode</h3>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "30px" }}>
        <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", border: "2px solid #4caf50" }}>
          <p style={{ fontSize: "0.9em", color: "#666", margin: "0 0 10px 0" }}>Total Issues Reported</p>
          <p style={{ fontSize: "2em", fontWeight: "bold", color: "#2d5016", margin: "0" }}>{data.totalIssues}</p>
        </div>
        <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", border: "2px solid #4caf50" }}>
          <p style={{ fontSize: "0.9em", color: "#666", margin: "0 0 10px 0" }}>Issues Resolved</p>
          <p style={{ fontSize: "2em", fontWeight: "bold", color: "#2d5016", margin: "0" }}>{data.resolvedCount}</p>
        </div>
        <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", border: "2px solid #2196f3" }}>
          <p style={{ fontSize: "0.9em", color: "#666", margin: "0 0 10px 0" }}>Water Saved</p>
          <p style={{ fontSize: "2em", fontWeight: "bold", color: "#2196f3", margin: "0" }}>{data.waterSaved.toFixed(0)} L</p>
        </div>
        <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", border: "2px solid #ff9800" }}>
          <p style={{ fontSize: "0.9em", color: "#666", margin: "0 0 10px 0" }}>Electricity Saved</p>
          <p style={{ fontSize: "2em", fontWeight: "bold", color: "#ff9800", margin: "0" }}>{data.electricitySaved.toFixed(2)} kWh</p>
        </div>
      </div>

      <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", marginBottom: "30px" }}>
        <h4 style={{ marginTop: "0" }}>Issues Reported Over Time (Last 6 Months)</h4>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "250px", paddingBottom: "20px" }}>
          {reportedTrend.map((count, idx) => (
            <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
              <div 
                style={{ 
                  width: "100%", 
                  height: `${count * 8}px`, 
                  backgroundColor: "#4caf50", 
                  borderRadius: "4px 4px 0 0",
                  minHeight: "20px"
                }}
              />
              <p style={{ fontSize: "0.75em", margin: "5px 0 0 0", color: "#666" }}>M{idx + 1}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", marginBottom: "30px" }}>
        <h4 style={{ marginTop: "0" }}>Resource Savings Trend (Last 6 Months)</h4>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "250px", paddingBottom: "20px" }}>
          {savingsTrend.map((savings, idx) => (
            <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
              <div 
                style={{ 
                  width: "100%", 
                  height: `${savings * 0.5}px`, 
                  backgroundColor: "#2196f3", 
                  borderRadius: "4px 4px 0 0",
                  minHeight: "20px"
                }}
              />
              <p style={{ fontSize: "0.75em", margin: "5px 0 0 0", color: "#666" }}>M{idx + 1}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px" }}>
        <h4 style={{ marginTop: "0" }}>High-Waste Location Heatmap</h4>
        <p style={{ fontSize: "0.85em", color: "#666", marginTop: "0" }}>Locations with the most reported issues:</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" }}>
          {heatmapData.map((loc, idx) => (
            <div key={idx} style={{ padding: "15px", borderRadius: "8px", backgroundColor: loc.color, color: "white" }}>
              <p style={{ fontWeight: "bold", margin: "0 0 5px 0" }}>{loc.location}</p>
              <p style={{ fontSize: "1.8em", margin: "0", fontWeight: "bold" }}>{loc.issues}</p>
              <p style={{ fontSize: "0.85em", margin: "5px 0 0 0" }}>Issues Reported</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
