import { mockData } from './mockData';

let issues = [...mockData.issues];

export const getAnalytics = (mode) => {
  const filtered = issues.filter(i => i.mode === mode);
  const resolved = filtered.filter(i => i.status === 'Resolved');
  const waterSaved = resolved.reduce((sum, i) => sum + (i.resource === 'Water' ? i.savings : 0), 0);
  const electricitySaved = resolved.reduce((sum, i) => sum + (i.resource === 'Electricity' ? i.savings : 0), 0);
  const avgResolutionTime = resolved.length ? Math.round(resolved.reduce((sum, i) => sum + i.duration, 0) / resolved.length) : 0;
  
  return Promise.resolve({
    totalIssues: filtered.length,
    resolvedCount: resolved.length,
    waterSaved: Math.round(waterSaved * 100) / 100,
    electricitySaved: Math.round(electricitySaved * 100) / 100,
    avgResolutionTime
  });
};

export const getIssues = (mode) => {
  return Promise.resolve(issues.filter(i => i.mode === mode));
};

export const reportIssue = (issue) => {
  issues.push(issue);
  return Promise.resolve(issue);
};

export const updateIssue = (id, status) => {
  const issue = issues.find(i => i.id === id);
  if (issue) {
    issue.status = status;
    if (status === 'Resolved') {
      issue.duration = Math.round((new Date() - new Date(issue.timestamp)) / 3600000);
      const rates = { 
        Water: { Low: 10, Medium: 20, High: 30 }, 
        Electricity: { Low: 0.075, Medium: 0.075, High: 0.075 } 
      };
      issue.savings = Math.round(rates[issue.resource][issue.severity] * issue.duration * 100) / 100;
    }
  }
  return Promise.resolve(issue);
};
