const axios = require('axios');

// Function to handle the API request
const login = async (username, password) => {
    try {
        const response = await axios.post('https://itstest2.saglik.gov.tr/token/app/token/', {
            username: username,
            password: password,
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

module.exports = { login }; // Export the function