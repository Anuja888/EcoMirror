import { useEffect, useState } from "react";
import { getAnalytics } from "../services/api";

export default function Dashboard({ mode }) {
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

  return (
    <div style={{ padding: "20px", backgroundColor: "#e8f5e8", minHeight: "100vh" }}>
      <h2>Community Impact Dashboard</h2>
      <p style={{ fontStyle: "italic", color: "#2d5016", marginBottom: "30px" }}>
        "This platform prevents resource waste by tracking issues, action, and resolution — not just awareness."
      </p>
      
      <h3>{mode} Mode - Anonymous Community Metrics</h3>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", marginBottom: "30px" }}>
        <div style={{ border: "2px solid #4caf50", padding: "20px", textAlign: "center", borderRadius: "8px", backgroundColor: "#fff" }}>
          <p style={{ fontSize: "2em", margin: "10px 0", color: "#4caf50" }}>📊</p>
          <p style={{ fontSize: "0.9em", color: "#666", margin: "5px 0" }}>Total Issues Reported</p>
          <p style={{ fontSize: "1.8em", fontWeight: "bold", color: "#2d5016", margin: "10px 0" }}>{data.totalIssues}</p>
        </div>
        
        <div style={{ border: "2px solid #4caf50", padding: "20px", textAlign: "center", borderRadius: "8px", backgroundColor: "#fff" }}>
          <p style={{ fontSize: "2em", margin: "10px 0" }}>✅</p>
          <p style={{ fontSize: "0.9em", color: "#666", margin: "5px 0" }}>Issues Resolved</p>
          <p style={{ fontSize: "1.8em", fontWeight: "bold", color: "#2d5016", margin: "10px 0" }}>{data.resolvedCount}</p>
        </div>
        
        <div style={{ border: "2px solid #2196f3", padding: "20px", textAlign: "center", borderRadius: "8px", backgroundColor: "#fff" }}>
          <p style={{ fontSize: "2em", margin: "10px 0" }}>💧</p>
          <p style={{ fontSize: "0.9em", color: "#666", margin: "5px 0" }}>Water Saved</p>
          <p style={{ fontSize: "1.8em", fontWeight: "bold", color: "#2196f3", margin: "10px 0" }}>{data.waterSaved.toFixed(0)} L</p>
        </div>
        
        <div style={{ border: "2px solid #ff9800", padding: "20px", textAlign: "center", borderRadius: "8px", backgroundColor: "#fff" }}>
          <p style={{ fontSize: "2em", margin: "10px 0" }}>⚡</p>
          <p style={{ fontSize: "0.9em", color: "#666", margin: "5px 0" }}>Electricity Saved</p>
          <p style={{ fontSize: "1.8em", fontWeight: "bold", color: "#ff9800", margin: "10px 0" }}>{data.electricitySaved.toFixed(2)} kWh</p>
        </div>
      </div>

      <div style={{ backgroundColor: "#fff", padding: "15px", borderRadius: "8px", borderLeft: "4px solid #4caf50" }}>
        <p style={{ color: "#666", fontSize: "0.95em", margin: 0 }}>
          <strong>Note:</strong> All metrics are aggregated and anonymous. This dashboard shows community-level impact, not individual contributions.
          {mode === 'Public' && ' Values shown are estimated potential savings based on standard resource leakage rates.'}
        </p>
      </div>
    </div>
  );
}
