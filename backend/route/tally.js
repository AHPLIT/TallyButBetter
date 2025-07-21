// routes/tally.js
const express = require("express");
const router = express.Router();
const db = require("../db");
const { Parser } = require("json2csv");

// POST /api/submit - Save a new tally entry
router.post("/submit", (req, res) => {
  const { department, qType, referral, notes, timestamp } = req.body;

  db.run(
    `INSERT INTO queries (department, q_type, referral, notes, timestamp)
     VALUES (?, ?, ?, ?, ?)`,
    [department, qType, referral ? 1 : 0, notes, timestamp],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ success: true, id: this.lastID });
    }
  );
});

// GET /api/report - Retrieve all tally entries
router.get("/report", (req, res) => {
  db.all(`SELECT * FROM queries ORDER BY timestamp DESC`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// GET /api/export - Export all entries as CSV
router.get("/export", (req, res) => {
  db.all(`SELECT * FROM queries ORDER BY timestamp DESC`, [], (err, rows) => {
    if (err) return res.status(500).send(err.message);

    const parser = new Parser();
    const csv = parser.parse(rows);
    res.header("Content-Type", "text/csv");
    res.attachment("tally_report.csv");
    res.send(csv);
  });
});

module.exports = router;
