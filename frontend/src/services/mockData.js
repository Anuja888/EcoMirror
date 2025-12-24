export const mockData = {
  issues: [
    { id: 1, resource: 'Water', location: 'Block A, Room 101', severity: 'High', status: 'Resolved', timestamp: new Date(Date.now() - 86400000 * 5), authority: 'Warden', mode: 'Campus', reporterId: 1, duration: 48, savings: 1440 },
    { id: 2, resource: 'Electricity', location: 'Block B, Floor 2', severity: 'Medium', status: 'In Progress', timestamp: new Date(Date.now() - 86400000 * 2), authority: 'Warden', mode: 'Campus', reporterId: 2, duration: 0, savings: 0 },
    { id: 3, resource: 'Water', location: 'Block C, Bathroom', severity: 'Low', status: 'Acknowledged', timestamp: new Date(Date.now() - 86400000), authority: 'Warden', mode: 'Campus', reporterId: 1, duration: 0, savings: 0 },
    { id: 4, resource: 'Electricity', location: 'Building A, Flat 5', severity: 'Medium', status: 'Resolved', timestamp: new Date(Date.now() - 86400000 * 7), authority: 'Society Admin', mode: 'Society', reporterId: 3, duration: 72, savings: 5.4 },
    { id: 5, resource: 'Water', location: 'Building B, Common Area', severity: 'High', status: 'In Progress', timestamp: new Date(Date.now() - 86400000 * 3), authority: 'Society Admin', mode: 'Society', reporterId: 4, duration: 0, savings: 0 },
    { id: 6, resource: 'Water', location: 'Park Avenue, Public Fountain', severity: 'Medium', status: 'Forwarded to Authority', timestamp: new Date(Date.now() - 86400000 * 1), authority: 'Local Authority', mode: 'Public', reporterId: 5, duration: 0, savings: 0 },
    { id: 7, resource: 'Electricity', location: 'Market Street, Street Light', severity: 'Low', status: 'Status Pending', timestamp: new Date(Date.now() - 86400000 * 4), authority: 'Local Authority', mode: 'Public', reporterId: 6, duration: 0, savings: 0 },
  ]
};
