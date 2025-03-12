const axios = require("axios");

const ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
const BASE_URL = process.env.SQUARE_API_URL;

const squareService = {
    async fetchPayments() {
        try {
            const response = await axios.get(`${BASE_URL}/payments`, {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    "Square-Version": "2025-02-20",
                    "Content-Type": "application/json",
                },
            });
            return response.data.payments || [];
        } catch (error) {
            console.error("Error fetching payments:", error.response?.data || error.message);
            return [];
        }
    },

    async  fetchPaymentsByDate({ startDate, endDate }) {
        let allPayments = [];
        let cursor = null;
    
        try {
            do {
                
                let url = `${BASE_URL}/payments?begin_time=${startDate}&end_time=${endDate}`;
                if (cursor) {
                    url += `&cursor=${cursor}`; 
                }
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                        "Square-Version": "2025-02-20",
                        "Content-Type": "application/json",
                    },
                });
                allPayments = allPayments.concat(response.data.payments || []);
                cursor = response.data.cursor;
    
            } while (cursor);  
    
            return allPayments; 
    
        } catch (error) {
            console.error("Error fetching payments:", error.response?.data || error.message);
            return [];
        }
    },
    async fetchEmployees() {
        try {
            const response = await axios.get(`${BASE_URL}/employees`, {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    "Square-Version": "2024-02-15",
                    "Content-Type": "application/json",
                },
            });
            return response.data.employees || [];
        } catch (error) {
            console.error("Error fetching employees:", error.response?.data || error.message);
            return [];
        }
    }
};

module.exports = squareService;
