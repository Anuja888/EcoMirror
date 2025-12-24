# EcoMirror - Resource Waste Prevention Platform
## Hackathon-Ready Prototype

---

## 🎯 Project Overview

**EcoMirror** is a fully connected, rule-based platform that prevents water and electricity wastage by enabling reporting, accountability, resolution tracking, and community-level impact visualization. It works across three distinct modes: Campus, Society, and Public.

**Core Philosophy:** 
> "This platform prevents resource waste by tracking issues, action, and resolution — not just awareness."

---

## ✨ Features Implemented (All 7)

### **FEATURE 1: RESOURCE WASTE REPORTING (CORE)**
- Users report water or electricity wastage with:
  - Resource type (Water / Electricity)
  - Mode-aware location input (Campus: Block/Room, Society: Building/Flat, Public: Area/Landmark)
  - Severity levels (Low / Medium / High)
  - Optional photo upload
- On submission: Issue created with status = "Reported", timestamp saved, authority auto-assigned
- **File:** [ReportForm.jsx](frontend/src/components/ReportForm.jsx)

### **FEATURE 2: ISSUE LIFECYCLE TRACKING (ACCOUNTABILITY)**
- Campus & Society: Reported → Acknowledged → In Progress → Resolved
- Public: Reported → Forwarded to Authority → Status Pending
- Visual timeline with color-coded status progression
- Only authorities can update status; reporters view read-only
- **File:** [IssueTracker.jsx](frontend/src/components/IssueTracker.jsx)

### **FEATURE 3: ROLE-BASED ACCESS (REAL-WORLD USAGE)**
Three roles with distinct permissions:
1. **User:** Report issues, track status, view community impact
2. **Authority:** View assigned issues, update lifecycle, add notes, access analytics
3. **Viewer/Demo:** Read-only access to all dashboards

UI adapts based on role selection at onboarding
- **File:** [App.jsx](frontend/src/App.jsx)

### **FEATURE 4: COMMUNITY IMPACT DASHBOARD (ANONYMOUS)**
Displays aggregated metrics per mode:
- Total issues reported
- Total issues resolved
- Water saved (Liters)
- Electricity saved (kWh)
- Large metric cards with clear icons
- No individual eco-scores or rankings (prevents social comparison language)
- **File:** [Dashboard.jsx](frontend/src/components/Dashboard.jsx)

### **FEATURE 5: TRANSPARENT IMPACT CALCULATOR (CREDIBILITY)**
Rule-based calculation with full transparency:

**Water Leakage Rates:**
- Low: 10 L/hour
- Medium: 20 L/hour
- High: 30 L/hour

**Electricity Rates:** 0.075 kWh/hour

**Formula:** Savings = Rate × Duration (from report to resolution)

- Public mode values labeled as "estimated potential savings"
- Expandable "How we calculate" section with full methodology
- **File:** [ImpactCalculator.jsx](frontend/src/components/ImpactCalculator.jsx)

### **FEATURE 6: TIME-TO-RESOLUTION ANALYTICS (EFFICIENCY)**
Available for Campus & Society modes only:
- Average resolution time per mode
- Weekly resolution trend (5-week bar chart)
- Fastest vs slowest locations table
- Performance indicators (Fast/Medium/Slow)
- Purpose: Measure response efficiency, not user behavior
- **File:** [Analytics.jsx](frontend/src/components/Analytics.jsx)

### **FEATURE 7: SUSTAINABILITY PERFORMANCE DASHBOARD (PROOF)**
System-wide trends visualization:
- Issues reported over time (6-month trend)
- Issues resolved over time
- Resource savings trend
- High-waste location heatmap (color-coded by report frequency)
- Filtering by mode
- **File:** [SustainabilityDashboard.jsx](frontend/src/components/SustainabilityDashboard.jsx)

---

## 🗂️ Project Structure

```
frontend/
├── src/
│   ├── App.jsx                          # Main app with onboarding & navigation
│   ├── main.jsx                         # Entry point
│   ├── components/
│   │   ├── Dashboard.jsx                # Feature 4: Impact metrics
│   │   ├── ReportForm.jsx               # Feature 1: Waste reporting
│   │   ├── IssueTracker.jsx             # Feature 2: Lifecycle tracking
│   │   ├── Analytics.jsx                # Feature 6: Resolution analytics
│   │   ├── SustainabilityDashboard.jsx  # Feature 7: Performance trends
│   │   ├── ImpactCalculator.jsx         # Feature 5: Impact calculation
│   │   └── IssueList.jsx                # Utility component
│   └── services/
│       ├── api.js                       # Rule-based data simulation
│       └── mockData.js                  # Realistic simulated data (7 issues)
├── package.json
└── index.html

backend/
├── data/
│   └── issues.json                      # Placeholder for future backend
├── routes/
├── server.js
└── package.json
```

---

## 🎮 Demo Flow (FULLY FUNCTIONAL)

1. **User selects mode** (Campus/Society/Public) at onboarding
2. **User selects role** (User/Authority/Viewer)
3. **User reports issue** (Water leak in Block A - High severity)
4. **Authority reviews** issue in Issue Tracker
5. **Authority updates status** → Acknowledged → In Progress → Resolved
6. **Impact calculator** automatically computes savings (30 L/hour × 48 hours = 1440 L saved)
7. **Dashboards update** showing new metrics across all tabs

---

## 📊 Simulated Data

Pre-loaded with 7 realistic issues across all modes:

| ID | Resource | Location | Severity | Status | Mode | Duration | Savings |
|---|---|---|---|---|---|---|---|
| 1 | Water | Block A, Room 101 | High | Resolved | Campus | 48h | 1440 L |
| 2 | Electricity | Block B, Floor 2 | Medium | In Progress | Campus | - | - |
| 3 | Water | Block C, Bathroom | Low | Acknowledged | Campus | - | - |
| 4 | Electricity | Building A, Flat 5 | Medium | Resolved | Society | 72h | 5.4 kWh |
| 5 | Water | Building B, Common | High | In Progress | Society | - | - |
| 6 | Water | Park Ave, Fountain | Medium | Forwarded | Public | - | - |
| 7 | Electricity | Market St, Light | Low | Status Pending | Public | - | - |

---

## 🔧 Technology Stack

- **Frontend Framework:** React 18.2 with Hooks
- **Build Tool:** Vite 5.0
- **State Management:** React useState (local)
- **Styling:** Inline CSS with green/neutral palette
- **Data:** Rule-based simulation (NO AI/ML)
- **Logic:** Transparent, explainable calculations

---

## 🚀 Running the Prototype

```bash
cd frontend
npm install
npm run dev
```

Access at: `http://localhost:5173/`

---

## 🎨 UI/UX Design

- **Color Palette:** Green (#4caf50), Blue (#2196f3), Orange (#ff9800), Neutral
- **Typography:** High contrast, readable fonts
- **Navigation:** Simple, mode/role-aware buttons
- **Layout:** Responsive grid, minimal animations
- **Accessibility:** Clear labels, logical tab order

---

## 🔒 Design Constraints Met

✅ Software-only web application  
✅ NO AI / Machine Learning  
✅ All logic rule-based and transparent  
✅ Simulated but realistic data  
✅ Feasibility, accountability, measurable impact  
✅ No personal carbon footprints  
✅ No daily streaks or badges  
✅ No social comparison language (community-focused metrics only)  
✅ No social sharing  
✅ No waste segregation guides  

---

## 📋 Key Files to Review

| File | Purpose |
|---|---|
| [mockData.js](frontend/src/services/mockData.js) | 7 realistic simulated issues |
| [api.js](frontend/src/services/api.js) | Rule-based calculations & analytics |
| [ReportForm.jsx](frontend/src/components/ReportForm.jsx) | Feature 1: Reporting |
| [IssueTracker.jsx](frontend/src/components/IssueTracker.jsx) | Feature 2: Lifecycle |
| [Dashboard.jsx](frontend/src/components/Dashboard.jsx) | Feature 4: Impact |
| [ImpactCalculator.jsx](frontend/src/components/ImpactCalculator.jsx) | Feature 5: Calculations |
| [Analytics.jsx](frontend/src/components/Analytics.jsx) | Feature 6: Efficiency |
| [SustainabilityDashboard.jsx](frontend/src/components/SustainabilityDashboard.jsx) | Feature 7: Trends |
| [App.jsx](frontend/src/App.jsx) | Feature 3: Role-based access & onboarding |

---

## ✅ Hackathon Readiness Checklist

- [x] All 7 features fully implemented and working
- [x] Realistic mock data loaded
- [x] Role-based access control functional
- [x] Three distinct modes (Campus/Society/Public)
- [x] Complete demo flow executable
- [x] Responsive UI with professional styling
- [x] Rules transparent and documented
- [x] No external API dependencies
- [x] Zero AI/ML logic
- [x] Clean, minimal codebase

---

## 📝 Notes

- **Data Persistence:** Currently uses in-memory state. For production, connect to [backend/server.js](backend/server.js)
- **Analytics:** Using simulated trends for demo. Can integrate real data sources later
- **Calculations:** All formulas hardcoded and visible for full transparency
- **Future:** Add export reports, email notifications, geolocation mapping

---

**Built for the Green Tech Sustainability Hackathon**  
**Platform: Prevents waste through tracking, action, and resolution.**
