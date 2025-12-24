const express = require("express");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const calculateImpact = require("../utils/impactCalculator");

const router = express.Router();
const DATA_PATH = "./data/issues.json";

const readData = () =>
  JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));

const writeData = (data) =>
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

router.get("/", (req, res) => {
  res.json(readData());
});

router.post("/", (req, res) => {
  const issues = readData();

  const newIssue = {
    id: uuid(),
    ...req.body,
    status: "Reported",
    createdAt: new Date(),
    resolvedAt: null,
    impact: 0
  };

  issues.push(newIssue);
  writeData(issues);
  res.json(newIssue);
});

router.put("/:id/status", (req, res) => {
  const issues = readData();
  const issue = issues.find(i => i.id === req.params.id);

  issue.status = req.body.status;

  if (req.body.status === "Resolved") {
    issue.resolvedAt = new Date();
    issue.impact = calculateImpact(issue);
  }

  writeData(issues);
  res.json(issue);
});

module.exports = router;
