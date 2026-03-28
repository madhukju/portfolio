const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./db');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

// POST route for the contact form
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const sql = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
    db.query(sql, [name, email, message], (err, result) => {
        if (err) {
            console.error('Error inserting into database:', err);
            return res.status(500).json({ error: 'Database error. Failed to save message.' });
        }
        res.status(200).json({ message: 'Message sent successfully!' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Backend server running accurately at http://localhost:${port}`);
});
