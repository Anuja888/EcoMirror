function calculateImpact(issue) {
  const waterRates = { low: 10, medium: 20, high: 30 };
  const electricityRates = { fan: 0.075, light: 0.06 };

  if (!issue.resolvedAt) return 0;

  const hours =
    (new Date(issue.resolvedAt) - new Date(issue.createdAt)) / 3600000;

  if (issue.resource === "water") {
    return waterRates[issue.severity] * hours;
  }

  if (issue.resource === "electricity") {
    return electricityRates[issue.appliance] * hours;
  }

  return 0;
}

module.exports = calculateImpact;
