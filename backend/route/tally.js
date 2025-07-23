const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const router = express.Router();
const db = new sqlite3.Database(path.join(__dirname, "../tally.db"));

// Create the table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS tally (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    department TEXT NOT NULL,
    qType TEXT NOT NULL,
    referral INTEGER,
    notes TEXT,
    timestamp TEXT NOT NULL
  )
`);

router.post("/", (req, res) => {
  const { department, qType, referral, notes, timestamp } = req.body;
  const query = `
    INSERT INTO tally (department, qType, referral, notes, timestamp)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(query, [department, qType, referral ? 1 : 0, notes, timestamp], function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to insert tally" });
    }
    res.json({ success: true, id: this.lastID });
  });
});

// GET tallies with optional filtering
router.get("/", (req, res) => {
  const { start, end, department } = req.query;
  let query = `SELECT * FROM tally WHERE DATE(timestamp) BETWEEN ? AND ?`;
  const params = [start, end];

  if (department && department !== "All") {
  query += ` AND LOWER(department) = LOWER(?)`;
  params.push(department);
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Failed to fetch data" });
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
