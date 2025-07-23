const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");

const tallyRoute = require("./route/tally");
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Direct route for homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Direct route for reports page
app.get("/reports.html", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/reports.html"));
});

// API route
app.use("/api/tally", tallyRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
