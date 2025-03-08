const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to SQLite database
const db = new sqlite3.Database("./weather.db", (err) => {
  if (err) console.error("Database connection error:", err);
  else console.log("Connected to SQLite database");
});

// Create table if not exists
db.run(`
  CREATE TABLE IF NOT EXISTS weather (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    location TEXT NOT NULL,
    temperature TEXT NOT NULL,
    description TEXT NOT NULL,
    date TEXT NOT NULL
  )
`);

// Fetch weather entries
app.get("/weather", (req, res) => {
  db.all("SELECT * FROM weather ORDER BY date DESC", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add new weather entry
app.post("/weather", (req, res) => {
  const { location, temperature, description, date } = req.body;
  db.run(
    "INSERT INTO weather (location, temperature, description, date) VALUES (?, ?, ?, ?)",
    [location, temperature, description, date],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ success: true, id: this.lastID });
    }
  );
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
