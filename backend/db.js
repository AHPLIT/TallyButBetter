// db.js
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./tally.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS queries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    department TEXT NOT NULL,
    q_type TEXT NOT NULL,
    referral INTEGER NOT NULL,
    notes TEXT,
    timestamp TEXT NOT NULL
  )`);
});

module.exports = db;
