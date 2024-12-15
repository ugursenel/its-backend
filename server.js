const express = require('express');
const functions = require('firebase-functions');
const app = express();
const apiRoutes = require('./routes/api'); // Import the API routes
//const cors=require('cors');

//app.use(cors())
// Middleware to parse JSON bodies
app.use(express.json());

// Use the API routes
app.use('/api', apiRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Hello World 2!');
});

//exports.app = functions.https.onRequest(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// Start the server
/*app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
*/