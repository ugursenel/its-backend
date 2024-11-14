const express = require('express');
const { fetchToken, fetchVerify, postSale, cancelSale } = require('../services/tokenService'); // Import the function
const router = express.Router();
const username = '86800014717510000';
const password='Ozun2309';

// POST route to send username and password
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const data = await fetchToken(username, password); // Call the function
        res.json(data); // Send the response data back to the client
    } catch (error) {
        // Handle errors
        console.log(error.message)
        res.status(error.status).json({ message: error.message });
    }
});

// New route to handle the specified JSON structure
router.post('/verify', async (req, res) => {
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
