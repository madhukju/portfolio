const mysql = require('mysql2');

// Connect without specifying the database first
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Madhu@123'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL server:', err.message);
        return;
    }
    console.log('Successfully connected to MySQL server.');

    // Automatically create database if it doesn't exist
    connection.query('CREATE DATABASE IF NOT EXISTS portfolio_db', (err) => {
        if (err) {
            console.error('Error creating database:', err.message);
            return;
        }
        console.log('Database `portfolio_db` is ready.');

        // Select the database
        connection.query('USE portfolio_db', (err) => {
            if (err) throw err;

            // Automatically create the table if it doesn't exist
            const createTableSql = `
                CREATE TABLE IF NOT EXISTS contacts (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL,
                    message TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            `;
            connection.query(createTableSql, (err) => {
                if (err) {
                    console.error('Error creating table:', err.message);
                } else {
                    console.log('Table `contacts` is ready.');
                }
            });
        });
    });
});

module.exports = connection;
