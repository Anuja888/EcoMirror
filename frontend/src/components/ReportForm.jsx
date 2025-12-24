import { useState } from "react";
import { reportIssue } from "../services/api";

export default function ReportForm({ mode, onReport }) {
  const [form, setForm] = useState({
    resource: "Water",
    location: "",
    severity: "Low",
    photo: null
  });

  const locationPlaceholder = 
    mode === "Campus" ? "e.g., Block A, Room 101" :
    mode === "Society" ? "e.g., Building A, Flat 5" :
    "e.g., Park Avenue, Public Fountain";

  const handleSubmit = e => {
    e.preventDefault();
    const issue = {
      id: Date.now(),
      ...form,
      status: "Reported",
      timestamp: new Date(),
      authority:
        mode === "Campus"
          ? "Warden"
          : mode === "Society"
          ? "Society Admin"
          : "Local Authority",
      mode: mode,
      reporterId: 1, // Simulated current user
      duration: 0,
      savings: 0
    };
    reportIssue(issue).then(() => {
      onReport();
      setForm({ resource: "Water", location: "", severity: "Low", photo: null });
    });
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#e8f5e8", minHeight: "100vh" }}>
      <h2>Report Waste Issue</h2>
      <p style={{ fontStyle: "italic", color: "#2d5016", marginBottom: "20px" }}>
        "This platform prevents resource waste by tracking issues, action, and resolution — not just awareness."
      </p>
      
      <form onSubmit={handleSubmit} style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", maxWidth: "500px" }}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Resource Type:</label>
          <select
            value={form.resource}
            onChange={e => setForm({ ...form, resource: e.target.value })}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          >
            <option>Water</option>
            <option>Electricity</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Location:</label>
          <input
            placeholder={locationPlaceholder}
            value={form.location}
            onChange={e => setForm({ ...form, location: e.target.value })}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Severity:</label>
          <select
            value={form.severity}
            onChange={e => setForm({ ...form, severity: e.target.value })}
            style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>Photo (optional):</label>
          <input
            type="file"
            onChange={e => setForm({ ...form, photo: e.target.files[0] })}
            style={{ width: "100%" }}
          />
        </div>

        <button type="submit" style={{ backgroundColor: "#4caf50", color: "white", padding: "10px 20px", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "1em", fontWeight: "bold" }}>
          Submit Report
        </button>
      </form>
    </div>
  );
}
