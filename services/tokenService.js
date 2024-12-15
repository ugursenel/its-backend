const axios = require('axios');

// Function to handle the API request
const fetchToken = async (username, password) => {
    try {
        const response = await axios.post('https://its2.saglik.gov.tr/token/app/token/', {
            username: username,
            password: password,
        },{ timeout: 15000 });
        return response.data; // Return the response data
    } catch (error) {
        // Throw an error with the status and message for handling in the route
   
            console.error(`[${new Date().toISOString()}] External API error:`, error.message);
            throw { status: error.response?.status || 504, message: error.message || 'API Timeout' };

    }
};

const fetchVerify = async (token, productData) => {
    try {
        const response = await axios.post('https://its2.saglik.gov.tr/reference/app/verification/', productData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Return the response data
    } catch (error) {
        // Throw an error with the status and message for handling in the route
        throw {
            status: error.response ? error.response.status : 500,
            message: error.response ? error.response.data : 'An error occurred while making the request',
        };
    }
};

const postSale = async (token, productData) => {
    console.log(productData)
    try {
        console.log('token : '+token)
        const response = await axios.post('https://its2.saglik.gov.tr/prescription/app/pharmacysale/', productData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Return the response data
    } catch (error) {
        // Throw an error with the status and message for handling in the route
        throw {
            status: error.response ? error.response.status : 500,
            message: error.response ? error.response.data : 'An error occurred while making the request',
        };
    }
};

const cancelSale = async (token, productData) => {
    console.log(productData)
    try {
        console.log('token : '+token)
        const response = await axios.post('https://its2.saglik.gov.tr/prescription/app/pharmacysalecancel/', productData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data; // Return the response data
    } catch (error) {
        // Throw an error with the status and message for handling in the route
        throw {
            status: error.response ? error.response.status : 500,
            message: error.response ? error.response.data : 'An error occurred while making the request',
        };
    }
};

module.exports = { fetchToken, fetchVerify, postSale, cancelSale }; // Export the function