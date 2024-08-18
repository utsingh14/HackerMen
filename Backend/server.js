const express = require('express');
const path = require('path');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../front-end')));

// Serve images from 'images' directory
app.use('/images', express.static(path.join(__dirname, '../images')));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'helloworld',
    database: 'legends_db'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database.');
});

// Route to get all states
app.get('/states', (req, res) => {
    const query = 'SELECT DISTINCT state FROM city';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Route to get cities by state
app.get('/cities/:state', (req, res) => {
    const state = req.params.state;
    const query = 'SELECT DISTINCT city FROM city WHERE state = ?';
    db.query(query, [state], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Route to get places by city + images
app.get('/places/:city', (req, res) => {
    const city = req.params.city;
    const query = `
        SELECT c.place, l.image_url 
        FROM city AS c
        LEFT JOIN legend AS l ON c.place = l.place
        WHERE c.city = ?
    `;
    db.query(query, [city], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

<<<<<<< HEAD
app.get('/legend/:place', (req, res) => {
    const place = req.params.place;
    console.log('Request received for place:', place);

    const query = 'SELECT fact FROM legend WHERE place = ?';
=======

// Route to get legend by place
app.get('/legend/:place', (req, res) => {
    const place = req.params.place;
    const query = 'SELECT fact, image_url FROM legend WHERE place = ?';
>>>>>>> 10dcf98b5f4b7e3b6ff3afbb1d75fc277236c624
    db.query(query, [place], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Server error' });
            return;
        }

        if (results.length === 0) {
            console.log(`No legend found for place: ${place}`);
            res.status(404).json({ message: 'No legend found' });
            return;
        }

        console.log(`Legend found for place ${place}:`, results);
        res.json(results);
    });
});



// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
