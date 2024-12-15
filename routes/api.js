const express = require('express');
const { fetchToken, fetchVerify, postSale, cancelSale } = require('../services/tokenService'); // Import the function
const router = express.Router();
const username = '86800014717510000';
const password='Ozun2309';


app.get('/get', (req, res) => {
    res.send('Hello World from api!');
});

// POST route to send username and password
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    console.log('Received /login request:', { username });

    try {
        // Log before calling the function
        console.log('Calling fetchToken with:', { username, password });

        const data = await fetchToken(username, password); // Call the function

        // Log after receiving data
        console.log('fetchToken response:', data);

        res.json(data); // Send the response data back to the client
    } catch (error) {
        console.error(`[${new Date().toISOString()}] Error during /login request:`, error);
        res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
    }
});

// New route to handle the specified JSON structure
router.post('/verify', async (req, res) => {
    const { fr, dt, productList } = req.body;
    res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    // Check if required fields are provided
    if (!fr || !productList || !Array.isArray(productList)) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    try {
        // First, fetch the token
        
        const tokenData = await fetchToken(username, password); // Fetch the token
        const token = tokenData.token; // Extract the token (adjust according to your token structure)

        // Prepare product data to send
        const productData = {
            fr,
            dt,
            productList,
        };
        // Post the product data with the Bearer Token
        const responseData = await fetchVerify(token, productData);

        // Send back the response
        res.json({
            message: 'Product data submitted successfully!',
            data: responseData,
        });
    } catch (error) {
        // Handle errors
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/postSale', async (req, res) => {
    
    const { fr, dt, productList } = req.body;
    // Check if required fields are provided
    if (!fr || !productList || !Array.isArray(productList)) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    try {
        // First, fetch the token
        
        const tokenData = await fetchToken(username, password); // Fetch the token
        const token = tokenData.token; // Extract the token (adjust according to your token structure)
        // Prepare product data to send
        const productData = {
            fr,
            dt,
            productList,
        };
        // Post the product data with the Bearer Token
        const responseData = await postSale(token, productData);

        // Send back the response
        res.json({
            message: 'Product data submitted successfully!',
            data: responseData,
        });
    } catch (error) {
        // Handle errors
        console.log(error)
        res.status(error.status).json({ message: error.message });
    }
});

router.post('/cancelSale', async (req, res) => {
    
    const { fr, dt, productList } = req.body;
    // Check if required fields are provided
    if (!fr || !productList || !Array.isArray(productList)) {
        return res.status(400).json({ message: 'Invalid input' });
    }

    try {
        // First, fetch the token
        
        const tokenData = await fetchToken(username, password); // Fetch the token
        const token = tokenData.token; // Extract the token (adjust according to your token structure)
        // Prepare product data to send
        const productData = {
            fr,
            dt,
            productList,
        };
        // Post the product data with the Bearer Token
        const responseData = await cancelSale(token, productData);

        // Send back the response
        res.json({
            message: 'Product data submitted successfully!',
            data: responseData,
        });
    } catch (error) {
        // Handle errors
        console.log(error)
        res.status(error.status).json({ message: error.message });
    }
});

module.exports = router;
