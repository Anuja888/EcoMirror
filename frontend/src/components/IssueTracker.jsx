import { useState, useEffect } from "react";
import { getIssues, updateIssue } from "../services/api";

export default function IssueTracker({ mode, role, userId }) {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getIssues(mode).then(data => {
      setIssues(data);
      setLoading(false);
    });
  }, [mode]);

  const handleUpdate = (id, newStatus) => {
    updateIssue(id, newStatus).then(() => {
      setIssues(issues.map(i => i.id === id ? { ...i, status: newStatus } : i));
    });
  };

  const lifecycle = mode === 'Public' 
    ? ['Reported', 'Forwarded to Authority', 'Status Pending'] 
    : ['Reported', 'Acknowledged', 'In Progress', 'Resolved'];

  const filteredIssues = issues.filter(i => role === 'Authority' || role === 'Viewer' || i.reporterId === userId);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px", backgroundColor: "#e8f5e8", minHeight: "100vh" }}>
      <h2>Issue Tracker</h2>
      <h3>{mode} Mode</h3>

      {filteredIssues.length === 0 ? (
        <p>No issues to display.</p>
      ) : (
        filteredIssues.map(issue => {
          const currentIndex = lifecycle.indexOf(issue.status);
          const canUpdate = role === 'Authority' && currentIndex < lifecycle.length - 1;

          return (
            <div key={issue.id} style={{ 
              border: "2px solid #4caf50", 
              margin: "15px 0", 
              padding: "15px", 
              borderRadius: "8px", 
              backgroundColor: "#fff"
            }}>
              <p style={{ margin: "5px 0", fontWeight: "bold" }}>Issue #{issue.id}</p>
              <p style={{ margin: "5px 0" }}><strong>Resource:</strong> {issue.resource} | <strong>Location:</strong> {issue.location}</p>
              <p style={{ margin: "5px 0" }}><strong>Severity:</strong> {issue.severity} | <strong>Reported:</strong> {new Date(issue.timestamp).toLocaleDateString()}</p>
              <p style={{ margin: "5px 0", color: "#2d5016", fontWeight: "bold" }}>Status: {issue.status}</p>

              <div style={{ margin: "10px 0", padding: "10px", backgroundColor: "#f0f0f0", borderRadius: "4px", fontSize: "0.9em" }}>
                <strong>Timeline:</strong>
                <div style={{ display: "flex", gap: "5px", marginTop: "5px", flexWrap: "wrap" }}>
                  {lifecycle.map((s, idx) => (
                    <span 
                      key={s} 
                      style={{ 
                        padding: "5px 10px", 
                        backgroundColor: idx <= currentIndex ? "#4caf50" : "#ddd", 
                        color: idx <= currentIndex ? "white" : "#666",
                        borderRadius: "4px",
                        fontSize: "0.85em"
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {issue.savings > 0 && (
                <p style={{ margin: "10px 0", padding: "10px", backgroundColor: "#e3f2fd", borderRadius: "4px", color: "#1976d2" }}>
                  <strong>Impact:</strong> {issue.resource === 'Water' ? `${issue.savings} L saved` : `${issue.savings} kWh saved`}
                </p>
              )}

              {canUpdate && (
                <button 
                  onClick={() => handleUpdate(issue.id, lifecycle[currentIndex + 1])}
                  style={{ 
                    backgroundColor: "#2196f3", 
                    color: "white", 
                    padding: "8px 15px", 
                    border: "none", 
                    borderRadius: "4px", 
                    cursor: "pointer",
                    marginTop: "10px"
                  }}
                >
                  Update to: {lifecycle[currentIndex + 1]}
                </button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
