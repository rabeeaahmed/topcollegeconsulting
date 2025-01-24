const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Database setup
const db = new sqlite3.Database('./emails.db', (err) => {
    if (err) console.error('Error opening database:', err.message);
    else console.log('Connected to the SQLite database.');
});

// Create table if not exists
db.run(`CREATE TABLE IF NOT EXISTS emails (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// Route to handle form submissions
app.post('/submit', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).send('Email is required.');
    }

    db.run(`INSERT INTO emails (email) VALUES (?)`, [email], function (err) {
        if (err) {
            return res.status(500).send('Failed to save email.');
        }
        res.status(200).send('Email saved successfully!');
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
