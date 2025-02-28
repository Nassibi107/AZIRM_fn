const axios = require("axios");
require("dotenv").config();



const SQUARE_API_URL = process.env.SQUARE_API_URL || "https://connect.squareup.com/v2";
const ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
// Function to fetch all payments (with pagination)
async function getAllPayments(cursor = null, allPayments = []) {
    try {
        const params = { sort_order: "DESC", limit: 100 }; // Get 100 payments per request
        if (cursor) params.cursor = cursor;

        const response = await axios.get(`${SQUARE_API_URL}/payments`, {
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
            params,
        });

        const payments = response.data.payments || [];
        allPayments.push(...payments);

        // If more payments exist, fetch next page
        if (response.data.cursor) {
            return await getAllPayments(response.data.cursor, allPayments);
        }

        return allPayments;
    } catch (error) {
        console.error("Error fetching payments:", error.response ? error.response.data : error.message);
        return [];
    }
}

// Function to get customer email
async function getCustomerEmail(customerId) {
    try {
        const response = await axios.get(`${SQUARE_API_URL}/customers/${customerId}`, {
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        });

        return response.data.customer.email_address || null;
    } catch (error) {
        console.error(`Error fetching customer ${customerId}:`, error.message);
        return null;
    }
}

// API Endpoint: Get All Payments
exports.allP = async (req, res) => {
    try {
        const payments = await getAllPayments();
        const detailedPayments = [];

        for (const payment of payments) {
            let email = payment.receipt_email || null;

            // If email is not in payment, fetch from customer profile
            if (!email && payment.customer_id) {
                email = await getCustomerEmail(payment.customer_id);
            }

            detailedPayments.push({
                id: payment.id,
                amount: payment.amount_money.amount / 100,
                currency: payment.amount_money.currency,
                status: payment.status,
                created_at: payment.created_at,
                email: email,
            });
        }

        res.json({ success: true, payments: detailedPayments });
    } catch (error) {
        console.error("API Error:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

// Start server
