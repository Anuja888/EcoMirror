const express = require("express");
const cors = require("cors");

const issueRoutes = require("./routes/issues");
const analyticsRoutes = require("./routes/analytics");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/issues", issueRoutes);
app.use("/api/analytics", analyticsRoutes);

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
