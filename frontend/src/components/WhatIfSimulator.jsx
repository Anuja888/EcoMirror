import { useState } from "react";

export default function WhatIfSimulator({ mode }) {
  const [scenario, setScenario] = useState({
    waterReduction: 20,
    electricityReduction: 15,
    population: 100,
    days: 365
  });

  const calculateImpact = () => {
    // Base daily usage per person
    const baseWaterPerDay = mode === 'Campus' ? 50 : 40; // liters
    const baseElectricityPerDay = mode === 'Campus' ? 2 : 1.5; // kWh

    // Current usage
    const currentWater = baseWaterPerDay * scenario.population * scenario.days;
    const currentElectricity = baseElectricityPerDay * scenario.population * scenario.days;

    // Projected usage with reduction
    const reducedWater = currentWater * (1 - scenario.waterReduction / 100);
    const reducedElectricity = currentElectricity * (1 - scenario.electricityReduction / 100);

    // Savings
    const waterSavings = currentWater - reducedWater;
    const electricitySavings = currentElectricity - reducedElectricity;

    // Carbon equivalent (rough estimates)
    const carbonFromWater = (waterSavings / 1000) * 0.3; // kg CO2 per 1000L
    const carbonFromElectricity = electricitySavings * 0.5; // kg CO2 per kWh
    const totalCarbon = carbonFromWater + carbonFromElectricity;

    // Tree equivalent (one tree absorbs ~20kg CO2/year)
    const treeEquivalent = Math.round(totalCarbon / 20);

    return {
      currentWater: Math.round(currentWater),
      currentElectricity: Math.round(currentElectricity * 100) / 100,
      reducedWater: Math.round(reducedWater),
      reducedElectricity: Math.round(reducedElectricity * 100) / 100,
      waterSavings: Math.round(waterSavings),
      electricitySavings: Math.round(electricitySavings * 100) / 100,
      totalCarbon: Math.round(totalCarbon * 100) / 100,
      treeEquivalent
    };
  };

  const impact = calculateImpact();

  return (
    <div style={{ padding: "20px", backgroundColor: "#e8f5e8", minHeight: "100vh" }}>
      <h2>What-If Impact Simulator</h2>
      <h3>{mode} Mode - Planning Tool</h3>

      <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", marginBottom: "30px" }}>
        <h4 style={{ marginTop: "0" }}>Scenario Parameters</h4>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
          <div>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
              Water Reduction: {scenario.waterReduction}%
            </label>
            <input 
              type="range" 
              min="0" 
              max="50" 
              value={scenario.waterReduction}
              onChange={(e) => setScenario({ ...scenario, waterReduction: parseInt(e.target.value) })}
              style={{ width: "100%" }}
            />
            <p style={{ fontSize: "0.85em", color: "#666", margin: "5px 0 0 0" }}>Daily usage reduction per person</p>
          </div>

          <div>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
              Electricity Reduction: {scenario.electricityReduction}%
            </label>
            <input 
              type="range" 
              min="0" 
              max="50" 
              value={scenario.electricityReduction}
              onChange={(e) => setScenario({ ...scenario, electricityReduction: parseInt(e.target.value) })}
              style={{ width: "100%" }}
            />
            <p style={{ fontSize: "0.85em", color: "#666", margin: "5px 0 0 0" }}>Daily usage reduction per person</p>
          </div>

          <div>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
              Population: {scenario.population}
            </label>
            <input 
              type="number" 
              value={scenario.population}
              onChange={(e) => setScenario({ ...scenario, population: parseInt(e.target.value) || 0 })}
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
            <p style={{ fontSize: "0.85em", color: "#666", margin: "5px 0 0 0" }}>{mode === 'Campus' ? 'Students/Staff' : 'Residents'}</p>
          </div>

          <div>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
              Time Period: {scenario.days} days
            </label>
            <select 
              value={scenario.days}
              onChange={(e) => setScenario({ ...scenario, days: parseInt(e.target.value) })}
              style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            >
              <option value="7">1 Week</option>
              <option value="30">1 Month</option>
              <option value="90">3 Months</option>
              <option value="365">1 Year</option>
            </select>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", marginBottom: "30px" }}>
        <div style={{ backgroundColor: "#c8e6c9", padding: "20px", borderRadius: "8px" }}>
          <p style={{ fontSize: "0.9em", color: "#2d5016", margin: "0 0 10px 0", fontWeight: "bold" }}>Water Saved</p>
          <p style={{ fontSize: "2.2em", fontWeight: "bold", color: "#2d5016", margin: "0" }}>{impact.waterSavings.toLocaleString()} L</p>
          <p style={{ fontSize: "0.85em", color: "#558b2f", margin: "10px 0 0 0" }}>
            From {impact.currentWater.toLocaleString()} L baseline
          </p>
        </div>

        <div style={{ backgroundColor: "#c8e6c9", padding: "20px", borderRadius: "8px" }}>
          <p style={{ fontSize: "0.9em", color: "#2d5016", margin: "0 0 10px 0", fontWeight: "bold" }}>Electricity Saved</p>
          <p style={{ fontSize: "2.2em", fontWeight: "bold", color: "#2d5016", margin: "0" }}>{impact.electricitySavings} kWh</p>
          <p style={{ fontSize: "0.85em", color: "#558b2f", margin: "10px 0 0 0" }}>
            From {impact.currentElectricity} kWh baseline
          </p>
        </div>

        <div style={{ backgroundColor: "#c8e6c9", padding: "20px", borderRadius: "8px" }}>
          <p style={{ fontSize: "0.9em", color: "#2d5016", margin: "0 0 10px 0", fontWeight: "bold" }}>CO₂ Avoided</p>
          <p style={{ fontSize: "2.2em", fontWeight: "bold", color: "#2d5016", margin: "0" }}>{impact.totalCarbon.toLocaleString()} kg</p>
          <p style={{ fontSize: "0.85em", color: "#558b2f", margin: "10px 0 0 0" }}>
            Equivalent to {impact.treeEquivalent} trees
          </p>
        </div>
      </div>

      <div style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <h4 style={{ marginTop: "0" }}>Impact Summary</h4>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #4caf50" }}>
              <th style={{ padding: "10px", textAlign: "left" }}>Metric</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Current Scenario</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Projected Scenario</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Savings</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "10px" }}>Water Usage</td>
              <td style={{ padding: "10px" }}>{impact.currentWater.toLocaleString()} L</td>
              <td style={{ padding: "10px" }}>{impact.reducedWater.toLocaleString()} L</td>
              <td style={{ padding: "10px", fontWeight: "bold", color: "#2d5016" }}>-{impact.waterSavings.toLocaleString()} L</td>
            </tr>
            <tr style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "10px" }}>Electricity Usage</td>
              <td style={{ padding: "10px" }}>{impact.currentElectricity} kWh</td>
              <td style={{ padding: "10px" }}>{impact.reducedElectricity} kWh</td>
              <td style={{ padding: "10px", fontWeight: "bold", color: "#2d5016" }}>-{impact.electricitySavings} kWh</td>
            </tr>
            <tr>
              <td style={{ padding: "10px" }}>CO₂ Emissions</td>
              <td style={{ padding: "10px" }}>—</td>
              <td style={{ padding: "10px" }}>—</td>
              <td style={{ padding: "10px", fontWeight: "bold", color: "#2d5016" }}>-{impact.totalCarbon} kg</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ backgroundColor: "#f5f5f5", padding: "20px", borderRadius: "8px" }}>
        <h4 style={{ marginTop: "0" }}>How This Works</h4>
        <p style={{ color: "#666", marginBottom: "10px" }}>
          This simulator helps policy makers and facility managers understand the scale of impact from collective behavioral changes or system upgrades.
        </p>
        <ul style={{ color: "#666", margin: "0", paddingLeft: "20px" }}>
          <li>Adjust reduction percentages to model different interventions</li>
          <li>Change population size to reflect different scopes (floor, building, campus, city)</li>
          <li>Select time period to see daily, monthly, or annual impacts</li>
          <li>Use tree equivalents as a relatable benchmark for carbon reduction</li>
        </ul>
      </div>
    </div>
  );
}