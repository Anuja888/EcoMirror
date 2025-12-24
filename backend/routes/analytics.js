const express = require("express");
const fs = require("fs");

const router = express.Router();
const DATA_PATH = "./data/issues.json";

router.get("/", (req, res) => {
  const issues = JSON.parse(fs.readFileSync(DATA_PATH));

  const totalIssues = issues.length;
  const resolved = issues.filter(i => i.status === "Resolved");
  const waterSaved = resolved
    .filter(i => i.resource === "water")
    .reduce((sum, i) => sum + i.impact, 0);

  const electricitySaved = resolved
    .filter(i => i.resource === "electricity")
    .reduce((sum, i) => sum + i.impact, 0);

  res.json({
    totalIssues,
    resolvedCount: resolved.length,
    waterSaved,
    electricitySaved
  });
});

module.exports = router;
