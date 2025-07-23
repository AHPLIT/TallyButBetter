const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./tally.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS tally (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    department TEXT NOT NULL,
    qType TEXT NOT NULL,
    referral INTEGER NOT NULL,
    notes TEXT,
    timestamp TEXT NOT NULL
  )`);
});

module.exports = db;