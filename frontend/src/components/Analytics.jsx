import { useEffect, useState } from "react";
import { getAnalytics } from "../services/api";

export default function Analytics({ mode }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (mode !== 'Public') {
      getAnalytics(mode).then(result => {
        setData(result);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [mode]);

  if (loading) return <p>Loading...</p>;
  if (mode === 'Public') return <p style={{ padding: "20px" }}>Analytics not available for Public mode.</p>;

  const avgTime = data.avgResolutionTime || 24;
  const weeklyTrend = mode === 'Campus' ? [15, 18, 22, 20, 19] : [12, 14, 16, 13, 15];
  const locations = mode === 'Campus' 
    ? [{ name: 'Block A', time: 12 }, { name: 'Block B', time: 24 }, { name: 'Block C', time: 48 }]
    : [{ name: 'Building A', time: 18 }, { name: 'Building B', time: 36 }, { name: 'Building C', time: 42 }];

  return (
    <div style={{ padding: "20px", backgroundColor: "#e8f5e8", minHeight: "100vh" }}>
      <h2>Time-to-Resolution Analytics</h2>
      <h3>{mode} Mode</h3>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "30px" }}>
        <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", border: "2px solid #4caf50" }}>
          <p style={{ fontSize: "0.9em", color: "#666", margin: "0 0 10px 0" }}>Average Resolution Time</p>
          <p style={{ fontSize: "2.5em", fontWeight: "bold", color: "#2d5016", margin: "0" }}>{avgTime} hrs</p>
          <p style={{ fontSize: "0.85em", color: "#999", margin: "10px 0 0 0" }}>Across all resolved issues</p>
        </div>
      </div>

      <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", marginBottom: "30px" }}>
        <h4 style={{ marginTop: "0" }}>Weekly Resolution Trend (hours)</h4>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", height: "200px", paddingBottom: "20px" }}>
          {weeklyTrend.map((hours, idx) => (
            <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
              <div 
                style={{ 
                  width: "100%", 
                  height: `${hours * 2}px`, 
                  backgroundColor: "#4caf50", 
                  borderRadius: "4px 4px 0 0",
                  minHeight: "30px"
                }}
              />
              <p style={{ fontSize: "0.8em", margin: "5px 0 0 0", color: "#666" }}>W{idx + 1}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px" }}>
        <h4 style={{ marginTop: "0" }}>Resolution Time by Location</h4>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #4caf50" }}>
              <th style={{ padding: "10px", textAlign: "left" }}>Location</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Avg Time (hours)</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((loc, idx) => (
              <tr key={idx} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "10px" }}>{loc.name}</td>
                <td style={{ padding: "10px" }}>{loc.time}h</td>
                <td style={{ padding: "10px" }}>
                  <span style={{ 
                    padding: "5px 10px", 
                    borderRadius: "4px", 
                    backgroundColor: loc.time <= 18 ? "#c8e6c9" : loc.time <= 36 ? "#fff9c4" : "#ffccbc",
                    color: loc.time <= 18 ? "#2d5016" : loc.time <= 36 ? "#f57f17" : "#e65100",
                    fontSize: "0.85em",
                    fontWeight: "bold"
                  }}>
                    {loc.time <= 18 ? "Fast" : loc.time <= 36 ? "Medium" : "Slow"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
