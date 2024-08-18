const sqlite3 = require('sqlite3').verbose();
const Dbsource = "db.sqlite";

let db = new sqlite3.Database(Dbsource, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Connected to the SQLite database...');

        // Create customer table if it doesn't exist
        db.run(
            `CREATE TABLE IF NOT EXISTS customer (
                customerId INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                address TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                dateOfBirth TEXT NOT NULL,
                gender TEXT NOT NULL,
                age INTEGER NOT NULL,
                cardHolderName TEXT NOT NULL,
                cardNumber TEXT NOT NULL,
                expiryDate TEXT NOT NULL,
                cvv TEXT NOT NULL,
                timeStamp TEXT NOT NULL
            )`, (err) => {
                if (err) {
                    console.error('Error creating customer table:', err.message);
                }
            }
        );
    }
});

module.exports = db;
