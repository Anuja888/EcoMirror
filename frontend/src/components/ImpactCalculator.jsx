export default function ImpactCalculator({ issue }) {
  const rates = {
    Water: { Low: 10, Medium: 20, High: 30 },
    Electricity: { Low: 0.075, Medium: 0.075, High: 0.075 }
  };
  
  const savings = issue.status === 'Resolved' 
    ? rates[issue.resource][issue.severity] * issue.duration 
    : 0;

  const unit = issue.resource === 'Water' ? 'Liters' : 'kWh';

  return (
    <div style={{ padding: "20px", backgroundColor: "#e8f5e8", minHeight: "100vh" }}>
      <h2>Impact Calculator</h2>
      
      <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <h3 style={{ marginTop: "0" }}>Issue Details</h3>
        <p><strong>Resource:</strong> {issue.resource}</p>
        <p><strong>Location:</strong> {issue.location}</p>
        <p><strong>Severity:</strong> {issue.severity}</p>
        <p><strong>Status:</strong> {issue.status}</p>
        {issue.duration > 0 && <p><strong>Time to Resolution:</strong> {issue.duration} hours</p>}
      </div>

      <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", marginBottom: "20px", border: "3px solid #4caf50" }}>
        <h3 style={{ marginTop: "0", color: "#2d5016" }}>Estimated Savings</h3>
        {savings > 0 ? (
          <p style={{ fontSize: "2em", fontWeight: "bold", color: "#4caf50", margin: "0" }}>
            {savings.toFixed(2)} {unit}
          </p>
        ) : (
          <p style={{ color: "#999" }}>Issue not yet resolved - savings will be calculated upon resolution.</p>
        )}
      </div>

      {issue.mode === 'Public' && (
        <div style={{ backgroundColor: "#fff9c4", padding: "15px", borderRadius: "8px", marginBottom: "20px", borderLeft: "4px solid #f9a825" }}>
          <p style={{ margin: "0", color: "#f57f17", fontWeight: "bold" }}>
            ⚠️ Estimated potential savings based on standard resource leakage rates.
          </p>
        </div>
      )}

      <div style={{ backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "8px" }}>
        <h4 style={{ marginTop: "0" }}>How We Calculate Impact</h4>
        <details style={{ cursor: "pointer" }}>
          <summary style={{ fontWeight: "bold", marginBottom: "10px" }}>Click to expand calculation methodology</summary>
          <div style={{ marginTop: "15px", padding: "15px", backgroundColor: "#fff", borderRadius: "4px" }}>
            <h5>Water Leakage Rates</h5>
            <ul style={{ margin: "10px 0" }}>
              <li><strong>Low severity:</strong> 10 liters/hour</li>
              <li><strong>Medium severity:</strong> 20 liters/hour</li>
              <li><strong>High severity:</strong> 30 liters/hour</li>
            </ul>

            <h5>Electricity Usage Rates</h5>
            <ul style={{ margin: "10px 0" }}>
              <li><strong>Fan (Medium/Low):</strong> 0.075 kWh/hour</li>
              <li><strong>Light/Pump (Medium/Low):</strong> 0.075 kWh/hour</li>
            </ul>

            <h5>Calculation Formula</h5>
            <p style={{ backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "4px", fontFamily: "monospace" }}>
              Savings = Leakage Rate × Time to Resolution (hours)
            </p>

            <h5>Assumptions</h5>
            <ul style={{ margin: "10px 0" }}>
              <li>Waste continues at a constant rate until issue is resolved</li>
              <li>Rates are based on typical resource leakage scenarios</li>
              <li>Public mode values represent estimated potential impact</li>
              <li>Campus and Society modes use verified measurement data</li>
            </ul>
          </div>
        </details>
      </div>
    </div>
  );
}
