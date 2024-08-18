const express = require('express');
const app = express();
const db = require("./database.js");
const bodyParser = require("body-parser");

app.use(bodyParser.json());

let http_port = 8080;

app.listen(http_port, () => {
    console.log(`Server is running on ${http_port}`);
});

// Helper functions for validation
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validateCardNumber = (cardNumber) => {
    return /^\d{12}$/.test(cardNumber);
};

const validateExpiryDate = (expiryDate) => {
    // Assuming expiryDate should be in MM/YYYY format
    const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;
    return expiryDateRegex.test(expiryDate);
};

// API to register a customer
app.post("/api/register", (req, res) => {
    const {
        name,
        address,
        email,
        dateOfBirth,
        gender,
        age,
        cardHolderName,
        cardNumber,
        expiryDate,
        cvv,
        timeStamp
    } = req.body;

    // Validate input data
    if (!name || !address || !email || !dateOfBirth || !gender || !age || !cardHolderName || !cardNumber || !expiryDate || !cvv || !timeStamp) {
        return res.status(400).json({ "error": "All fields are required." });
    }
    if (!validateEmail(email)) {
        return res.status(400).json({ "error": "Invalid email address format." });
    }
    if (!validateCardNumber(cardNumber)) {
        return res.status(400).json({ "error": "Credit card number must be 12 digits long." });
    }
    if (!validateExpiryDate(expiryDate)) {
        return res.status(400).json({ "error": "Invalid expiry date format. Use MM/YYYY." });
    }

    const sql = 'INSERT INTO customer (name, address, email, dateOfBirth, gender, age, cardHolderName, cardNumber, expiryDate, cvv, timeStamp) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const params = [name, address, email, dateOfBirth, gender, parseInt(age), cardHolderName, cardNumber, expiryDate, cvv, timeStamp];

    db.run(sql, params, function (err) {
        if (err) {
            return res.status(400).json({ "error": err.message });
        } else {
            res.status(201).json({
                "message": `Customer ${name} has registered`,
                "customer": this.lastID
            });
        }
    });
});
