import { useState } from 'react';
import Dashboard from './components/Dashboard';
import ReportForm from './components/ReportForm';
import IssueTracker from './components/IssueTracker';
import Analytics from './components/Analytics';
import SustainabilityDashboard from './components/SustainabilityDashboard';
import ImpactCalculator from './components/ImpactCalculator';
import EnvironmentalDeviation from './components/EnvironmentalDeviation';
import WhatIfSimulator from './components/WhatIfSimulator';
import EcoAuditSnapshot from './components/EcoAuditSnapshot';
import { getIssues } from './services/api';

export default function App() {
  const [mode, setMode] = useState(null);
  const [role, setRole] = useState(null);
  const [view, setView] = useState('dashboard');
  const [userId] = useState(1);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [issues, setIssues] = useState([]);
  const [lowPowerMode, setLowPowerMode] = useState(false);

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    if (mode) {
      getIssues(mode).then(setIssues);
    }
  };

  const lowPowerStyle = lowPowerMode ? {
    filter: 'grayscale(100%)',
    animation: 'none'
  } : {};

  if (!mode) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        backgroundColor: lowPowerMode ? "#ccc" : "#e8f5e8", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        padding: "20px",
        ...lowPowerStyle
      }}>
        <div style={{ 
          backgroundColor: lowPowerMode ? "#ddd" : "#fff", 
          padding: "40px", 
          borderRadius: "12px", 
          maxWidth: "600px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
        }}>
          <h1 style={{ color: "#2d5016", marginTop: "0", textAlign: "center" }}>EcoMirror</h1>
          <p style={{ 
            fontStyle: "italic", 
            color: "#2d5016", 
            textAlign: "center",
            fontSize: "1.1em",
            marginBottom: "30px"
          }}>
            "This platform prevents resource waste by tracking issues, action, and resolution — not just awareness."
          </p>

          <div style={{ marginBottom: "30px" }}>
            <p style={{ fontWeight: "bold", marginBottom: "15px", fontSize: "1.05em" }}>Select Your Mode:</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px" }}>
              <button 
                onClick={() => setMode('Campus')}
                style={{
                  padding: "15px",
                  fontSize: "1em",
                  backgroundColor: lowPowerMode ? "#666" : "#4caf50",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "background-color 0.3s"
                }}
              >
                🏫 Campus Mode
              </button>
              <button 
                onClick={() => setMode('Society')}
                style={{
                  padding: "15px",
                  fontSize: "1em",
                  backgroundColor: lowPowerMode ? "#666" : "#2196f3",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "background-color 0.3s"
                }}
              >
                🏢 Society Mode
              </button>
              <button 
                onClick={() => setMode('Public')}
                style={{
                  padding: "15px",
                  fontSize: "1em",
                  backgroundColor: lowPowerMode ? "#666" : "#ff9800",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "background-color 0.3s"
                }}
              >
                🌍 Public Mode
              </button>
            </div>
          </div>

          <div style={{ 
            padding: "15px", 
            backgroundColor: lowPowerMode ? "#999" : "#f5f5f5", 
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <input 
              type="checkbox" 
              checked={lowPowerMode}
              onChange={(e) => setLowPowerMode(e.target.checked)}
              id="lowpower"
              style={{ cursor: "pointer" }}
            />
            <label htmlFor="lowpower" style={{ cursor: "pointer", margin: 0 }}>
              🔋 Low-Power Mode (grayscale, minimal effects)
            </label>
          </div>
        </div>
      </div>
    );
  }

  if (!role) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        backgroundColor: lowPowerMode ? "#ccc" : "#e8f5e8", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        padding: "20px",
        ...lowPowerStyle
      }}>
        <div style={{ 
          backgroundColor: lowPowerMode ? "#ddd" : "#fff", 
          padding: "40px", 
          borderRadius: "12px", 
          maxWidth: "600px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
        }}>
          <h1 style={{ color: "#2d5016", marginTop: "0", textAlign: "center" }}>Select Your Role</h1>
          <p style={{ textAlign: "center", color: "#666", marginBottom: "30px" }}>Mode: <strong>{mode}</strong></p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "12px" }}>
            <button 
              onClick={() => handleRoleChange('Reporter')}
              style={{
                padding: "15px",
                fontSize: "1em",
                backgroundColor: lowPowerMode ? "#666" : "#4caf50",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              👤 Reporter (Report Issues)
            </button>
            <button 
              onClick={() => handleRoleChange('Authority')}
              style={{
                padding: "15px",
                fontSize: "1em",
                backgroundColor: lowPowerMode ? "#666" : "#2196f3",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              🔑 Authority (Manage Issues)
            </button>
            <button 
              onClick={() => handleRoleChange('Viewer')}
              style={{
                padding: "15px",
                fontSize: "1em",
                backgroundColor: lowPowerMode ? "#666" : "#9c27b0",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              👁️ Viewer (Demo/Read-Only)
            </button>
          </div>

          <button 
            onClick={() => setMode(null)}
            style={{
              width: "100%",
              marginTop: "20px",
              padding: "10px",
              backgroundColor: "#999",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer"
            }}
          >
            ← Change Mode
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: lowPowerMode ? "#ccc" : "#f5f5f5", ...lowPowerStyle }}>
      <nav style={{ 
        padding: "15px 20px", 
        background: lowPowerMode ? "#333" : "#2d5016", 
        color: "white",
        display: "flex",
        gap: "10px",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap"
      }}>
        <div>
          <h3 style={{ margin: "0" }}>EcoMirror</h3>
          <p style={{ margin: "0", fontSize: "0.85em" }}>{mode} Mode | {role}</p>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
          <button onClick={() => setView('dashboard')} style={{ ...navButtonStyle(view === 'dashboard', lowPowerMode) }}>📊 Dashboard</button>
          {role === 'Reporter' && <button onClick={() => setView('report')} style={{ ...navButtonStyle(view === 'report', lowPowerMode) }}>✏️ Report</button>}
          <button onClick={() => setView('tracker')} style={{ ...navButtonStyle(view === 'tracker', lowPowerMode) }}>🔍 Tracker</button>
          {(role === 'Authority' || role === 'Viewer') && mode !== 'Public' && <button onClick={() => setView('analytics')} style={{ ...navButtonStyle(view === 'analytics', lowPowerMode) }}>📈 Analytics</button>}
          <button onClick={() => setView('sustainability')} style={{ ...navButtonStyle(view === 'sustainability', lowPowerMode) }}>🌱 Sustainability</button>
          {(role === 'Authority' || role === 'Viewer') && <button onClick={() => setView('deviation')} style={{ ...navButtonStyle(view === 'deviation', lowPowerMode) }}>⚠️ Deviation</button>}
          <button onClick={() => setView('whatif')} style={{ ...navButtonStyle(view === 'whatif', lowPowerMode) }}>🎯 What-If</button>
          <button onClick={() => setView('audit')} style={{ ...navButtonStyle(view === 'audit', lowPowerMode) }}>📋 Audit</button>
          <label style={{ cursor: "pointer", marginLeft: "10px", display: "flex", alignItems: "center", gap: "5px" }}>
            <input 
              type="checkbox" 
              checked={lowPowerMode}
              onChange={(e) => setLowPowerMode(e.target.checked)}
              style={{ cursor: "pointer" }}
            />
            🔋
          </label>
          <button onClick={() => { setMode(null); setRole(null); }} style={{ ...navButtonStyle(false, lowPowerMode), backgroundColor: lowPowerMode ? '#555' : '#d32f2f' }}>🚪 Exit</button>
        </div>
      </nav>

      {view === 'dashboard' && <Dashboard mode={mode} />}
      {view === 'report' && <ReportForm mode={mode} onReport={() => setView('tracker')} />}
      {view === 'tracker' && <IssueTracker mode={mode} role={role} userId={userId} />}
      {view === 'analytics' && <Analytics mode={mode} />}
      {view === 'sustainability' && <SustainabilityDashboard mode={mode} />}
      {view === 'deviation' && <EnvironmentalDeviation mode={mode} />}
      {view === 'whatif' && <WhatIfSimulator mode={mode} />}
      {view === 'audit' && <EcoAuditSnapshot mode={mode} />}
    </div>
  );
}

const navButtonStyle = (isActive, lowPower) => ({
  padding: "8px 15px",
  color: "white",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "0.9em",
  fontWeight: "bold",
  backgroundColor: isActive ? (lowPower ? "#555" : "#4caf50") : (lowPower ? "#333" : "#1a3a0f"),
  transition: "background-color 0.3s"
});
