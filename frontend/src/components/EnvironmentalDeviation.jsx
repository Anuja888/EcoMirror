import { useEffect, useState } from "react";
import { getIssues } from "../services/api";

export default function EnvironmentalDeviation({ mode }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getIssues(mode).then(issues => {
      const unresolved = issues.filter(i => i.status !== 'Resolved');
      const pending = unresolved.filter(i => i.status === 'In Progress' || i.status === 'Forwarded to Authority');
      
      // Calculate regression (pending issues multiplied by their continued impact)
      const waterRegression = pending
        .filter(i => i.resource === 'Water')
        .reduce((sum, i) => {
          const rates = { Low: 10, Medium: 20, High: 30 };
          return sum + (rates[i.severity] * 24); // 24 hours of continued waste
        }, 0);

      const electricityRegression = pending
        .filter(i => i.resource === 'Electricity')
        .reduce((sum, i) => sum + (0.075 * 24), 0);

      setData({
        totalUnresolved: unresolved.length,
        pendingCount: pending.length,
        waterRegression: waterRegression.toFixed(0),
        electricityRegression: electricityRegression.toFixed(2),
        baselineWater: 5000,
        baselineElectricity: 200
      });
      setLoading(false);
    });
  }, [mode]);

  if (loading) return <p>Loading...</p>;

  const waterDeviation = ((data.waterRegression / (data.baselineWater + parseFloat(data.waterRegression))) * 100).toFixed(1);
  const electricityDeviation = ((data.electricityRegression / (data.baselineElectricity + parseFloat(data.electricityRegression))) * 100).toFixed(1);

  return (
    <div style={{ padding: "20px", backgroundColor: "#e8f5e8", minHeight: "100vh" }}>
      <h2>Environmental Deviation Report</h2>
      <h3>{mode} Mode</h3>

      <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", marginBottom: "20px", borderLeft: "4px solid #d32f2f" }}>
        <p style={{ color: "#d32f2f", fontWeight: "bold", margin: "0 0 10px 0" }}>⚠️ System Performance Alert</p>
        <p style={{ margin: "0", color: "#666" }}>
          <strong>{data.totalUnresolved}</strong> unresolved issues are causing environmental deviation from baseline performance.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "30px" }}>
        <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", border: "2px solid #d32f2f" }}>
          <p style={{ fontSize: "0.9em", color: "#666", margin: "0 0 10px 0" }}>Water Regression (24h)</p>
          <p style={{ fontSize: "2em", fontWeight: "bold", color: "#d32f2f", margin: "0" }}>{data.waterRegression} L</p>
          <p style={{ fontSize: "0.85em", color: "#999", margin: "10px 0 0 0" }}>+{waterDeviation}% above baseline</p>
        </div>

        <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", border: "2px solid #d32f2f" }}>
          <p style={{ fontSize: "0.9em", color: "#666", margin: "0 0 10px 0" }}>Electricity Regression (24h)</p>
          <p style={{ fontSize: "2em", fontWeight: "bold", color: "#d32f2f", margin: "0" }}>{data.electricityRegression} kWh</p>
          <p style={{ fontSize: "0.85em", color: "#999", margin: "10px 0 0 0" }}>+{electricityDeviation}% above baseline</p>
        </div>

        <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", border: "2px solid #ff9800" }}>
          <p style={{ fontSize: "0.9em", color: "#666", margin: "0 0 10px 0" }}>Pending Issues</p>
          <p style={{ fontSize: "2em", fontWeight: "bold", color: "#ff9800", margin: "0" }}>{data.pendingCount}</p>
          <p style={{ fontSize: "0.85em", color: "#999", margin: "10px 0 0 0" }}>Causing active impact</p>
        </div>
      </div>

      <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px" }}>
        <h4 style={{ marginTop: "0" }}>Regression Analysis</h4>
        <p style={{ color: "#666", marginBottom: "15px" }}>
          This report shows how unresolved issues are reversing progress made on sustainability goals. All calculations are based on time-pending multiplied by standard leakage rates.
        </p>
        
        <div style={{ backgroundColor: "#f5f5f5", padding: "15px", borderRadius: "4px", marginBottom: "15px" }}>
          <p style={{ margin: "0 0 10px 0", fontWeight: "bold" }}>Baseline Performance (Monthly Target)</p>
          <ul style={{ margin: "0", paddingLeft: "20px", color: "#666" }}>
            <li>Water: {data.baselineWater} L</li>
            <li>Electricity: {data.baselineElectricity} kWh</li>
          </ul>
        </div>

        <div style={{ backgroundColor: "#ffebee", padding: "15px", borderRadius: "4px" }}>
          <p style={{ margin: "0 0 10px 0", fontWeight: "bold", color: "#d32f2f" }}>Current Regression (24h)</p>
          <ul style={{ margin: "0", paddingLeft: "20px", color: "#666" }}>
            <li>Additional Water: {data.waterRegression} L (+{waterDeviation}%)</li>
            <li>Additional Electricity: {data.electricityRegression} kWh (+{electricityDeviation}%)</li>
            <li>Root Cause: {data.pendingCount} unresolved issues</li>
          </ul>
        </div>
      </div>
    </div>
  );
}