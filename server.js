const express = require('express');
const app = express();
const port = 3000;
const apiRoutes = require('./routes/api'); // Import the API routes


// Middleware to parse JSON bodies
app.use(express.json());

// Use the API routes
app.use('/api', apiRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Hello World!');
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
