const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const envPath = path.join(__dirname, '.env'); // Adjust path as needed
const secret = crypto.randomBytes(32).toString('hex');

fs.readFile(envPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading .env file:', err);
        return;
    }

    let newData = data.split('\n').map(line => {
        if (line.startsWith('SESSION_SECRET=')) {
            return `SESSION_SECRET=${secret}`;
        }
        return line;
    }).join('\n');

    fs.writeFile(envPath, newData, 'utf8', (err) => {
        if (err) {
            console.error('Error writing to .env file:', err);
            return;
        }
        console.log('Updated SESSION_SECRET in .env file');
    });
});
