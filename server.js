const express = require('express');
const app = express();
const PORT = 3000;

// Function to generate a valid Dutch passport number
function generatePassportNumber() {
    const letters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ'; // Excludes 'O'
    const digits = '0123456789';

    let passportNumber = 'N'; // Always starts with 'N'

    // Generate next six characters (mix of letters & digits)
    for (let i = 0; i < 6; i++) {
        const characterSet = Math.random() < 0.5 ? letters : digits;
        passportNumber += characterSet[Math.floor(Math.random() * characterSet.length)];
    }

    // Generate last digit
    passportNumber += digits[Math.floor(Math.random() * digits.length)];

    // Append check digit
    passportNumber += calculateCheckDigit(passportNumber);

    return passportNumber;
}

// Check Digit Calculation (Modulo 10 Algorithm)
function calculateCheckDigit(passportNumber) {
    let sum = 0;
    const weight = [7, 3, 1, 7, 3, 1, 7, 3, 1];

    for (let i = 0; i < passportNumber.length; i++) {
        let charValue = passportNumber[i];
        
        if (isNaN(charValue)) {
            charValue = charValue.charCodeAt(0) - 55; // Convert letters to numbers ('A' = 10, etc.)
        } else {
            charValue = parseInt(charValue, 10);
        }

        sum += charValue * weight[i];
    }

    return sum % 10; // Returns final check digit
}

// API Endpoint to Generate Passport Number
app.get('/generate-passport-number', (req, res) => {
    const passportNumber = generatePassportNumber();
    res.json({ passport_number: passportNumber });
});

app.listen(PORT, () => {
    console.log(`API running at http://localhost:${PORT}`);
});
