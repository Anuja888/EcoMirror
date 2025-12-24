import { useEffect, useState } from "react";
import { getIssues, updateStatus } from "../services/api";

export default function IssueList() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    getIssues().then(setIssues);
  }, []);

  return (
    <div>
      <h3>Admin Panel</h3>
      {issues.map(i => (
        <div key={i.id}>
          {i.location} – {i.status}
          <button onClick={() => updateStatus(i.id, "Resolved")}>
            Resolve
          </button>
        </div>
      ))}
    </div>
  );
}
