// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const tallyRoute = require("./route/tally");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", tallyRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
