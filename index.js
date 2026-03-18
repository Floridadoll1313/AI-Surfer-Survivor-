const express = require('express');
const app = express();
const path = require('path');

// This tells Node to serve your ocean-themed CSS/Images from a "public" folder
app.use(express.static('public'));

app.get('/', (req, res) => {
    // Logic: Is the user logged in? Show the Blue Dashboard.
    // If not, show the Pink (Free) Landing Page.
    res.sendFile(path.join(__dirname, '/index.html')); 
});

app.listen(3000, () => console.log('Surfer Survivor site live on port 3000'));
