const axios = require("axios");
const { Transactions, Donation } = require("../Models");
const { Op } = require("sequelize");
const models = require("../Models");

const ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
const BASE_URL = process.env.SQUARE_API_URL;

const squareService = {
    async fetchPayments(date) {
        function formatStartOfDay(date) {
            date.setHours(12, 0, 0, 0);
            return date.toISOString(); 
        }
        let currentDate = new Date();
        
        let currentDay = currentDate.getDay();
        let daysToSubtract = currentDay === 0 ? 6 : currentDay - 1; 
        
        let startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - daysToSubtract);
        let formattedStartDate = formatStartOfDay(startDate);
        let endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6);
        endDate.setHours(11, 59, 59, 999);
        let formattedEndDate = endDate.toISOString();
        
        try {
            let allPayments = [];
            let cursor = null;
            do {
                if (date == 'now') 
                {
                    url = `${BASE_URL}/payments`;
                    cursor = null;
                }
                else 
                    url = `${BASE_URL}/payments?begin_time=${formattedStartDate}&end_time=${formattedEndDate}`;
                console.log("url", url);
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
            if(date != 'now')
                cursor = response.data.cursor;
    
            } while (cursor);  
    
            return allPayments; 
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
    },
    async fetchPaymentsByTeamID({ team_member_id }) {
        function formatStartOfDay(date) {
            date.setHours(12, 0, 0, 0);
            return date.toISOString(); 
        }
        let currentDate = new Date();
        
        let currentDay = currentDate.getDay();
        let daysToSubtract = currentDay === 0 ? 6 : currentDay - 1; 
        
        let startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate());
        let formattedStartDate = formatStartOfDay(startDate);
        let endDate = new Date(startDate);
        endDate.setHours(23, 59, 59, 999);
        let formattedEndDate = endDate.toISOString();
        try {
           
            console.log("currentDay", formatStartOfDay(startDate));
    
            let url = `${BASE_URL}/payments?begin_time=${formattedStartDate}&end_time=${formattedEndDate}`;
            console.log("url", url);
            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    "Square-Version": "2025-02-20",
                    "Content-Type": "application/json",
                },
            });
    
            let allPayments = response.data.payments;
            let filteredPayments = allPayments.filter(payment => payment.team_member_id === team_member_id);
    
            return filteredPayments;
    
        } catch (error) {
            console.error("Error fetching payments:", error.response?.data || error.message);
            return [];
        }
    },

  async  getAllCashLive() {
        try {
            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);
    
            const usersWithDonations = await models.User.findAll({
                include: [
                    {
                        model: models.Donation,
                        as: "donations",
                        where: {
                            createdAt: { [Op.between]: [startOfDay, endOfDay] }
                        },
                        required: false // Includes users even if they have no donations
                    }
                ],
                order: [["id", "ASC"]]
            });
    
            return usersWithDonations.map(user => ({
                userId: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                team_member_id: user.team_member_id || null, // If team_member_id exists in Transactions
                donations: user.donations.map(donation => ({
                    donationId: donation.idD,
                    amount: donation.amount,
                    type: donation.type,
                    createdAt: donation.createdAt
                }))
            }));
    
        } catch (error) {
            console.error("Error fetching users with donations:", error.response?.data || error.message);
            return [];
        }
    }
    
}    


module.exports = squareService;
