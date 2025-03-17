const axios = require("axios");
const { Transactions, Donation } = require("../Models");
const { Op } = require("sequelize");
const models = require("../Models");

const ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
const BASE_URL = process.env.SQUARE_API_URL;

const squareService = {
    async fetchPayments(date) {
        function formatStartNoonUTC(date) {
            date.setUTCHours(12, 0, 0, 0);
            return date.toISOString();
        }

        function formatEndMidnightUTC(date) {
            date.setUTCDate(date.getUTCDate() + 1);
            date.setUTCHours(0, 0, 0, 0);
            return date.toISOString();
        }

        let currentDate = new Date();
        let currentDay = currentDate.getUTCDay();
        let daysToSubtract = currentDay === 0 ? 6 : currentDay - 1;

        let startDate = new Date(currentDate);
        startDate.setUTCDate(currentDate.getUTCDate() - daysToSubtract);
        let formattedStartDate = formatStartNoonUTC(startDate);

        let endDate = new Date(startDate);
        endDate.setUTCDate(startDate.getUTCDate() + 6);
        let formattedEndDate = formatEndMidnightUTC(endDate);

        let todayStart = formatStartNoonUTC(new Date());  
        let todayEnd = formatEndMidnightUTC(new Date());

        try {
            let allPayments = [];
            let cursor = null;
            let url;

            do {
                if (date === 'now') {
                    url = `${BASE_URL}/payments?begin_time=${encodeURIComponent(todayStart)}&end_time=${encodeURIComponent(todayEnd)}`;
                    console.error("fetchPayments(date) url", url);
                    cursor = null;
                } else {
                    url = `${BASE_URL}/payments?begin_time=${encodeURIComponent(formattedStartDate)}&end_time=${encodeURIComponent(formattedEndDate)}`;
                    console.error("fetchPayments(date week url", url);
                }

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
                if (date !== 'now') cursor = response.data.cursor;

            } while (cursor);

            return allPayments;
        } catch (error) {
            console.error("fetchPayments(date)");
            console.error("Error fetching payments:", error.response?.data || error.message);
            return []; 
        }
    },

    async fetchPaymentsByTeamID({ team_member_id }) {
        function formatStartNoonUTC(date) {
            date.setUTCHours(12, 0, 0, 0);
            return date.toISOString();
        }

        function formatEndMidnightUTC(date) {
            date.setUTCDate(date.getUTCDate() + 1);
            date.setUTCHours(0, 0, 0, 0);
            return date.toISOString();
        }

        let currentDate = new Date();
        let formattedStartDate = formatStartNoonUTC(currentDate);
        let formattedEndDate = formatEndMidnightUTC(currentDate);

        try {
            let url = `${BASE_URL}/payments?begin_time=${formattedStartDate}&end_time=${formattedEndDate}`;
            console.error("fetchPaymentsByTeamID => URL:", url);

            const response = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    "Square-Version": "2025-02-20",
                    "Content-Type": "application/json",
                },
            });

            let allPayments = response.data.payments || [];
            let filteredPayments = allPayments.filter(payment => payment.team_member_id === team_member_id);

            return filteredPayments;
        } catch (error) {
            console.error("Error fetching payments in fetchPaymentsByTeamID:", error.toJSON());
            return [];
        }
    },

    async getAllCashLive() {
        try {
            const startOfDay = new Date();
            startOfDay.setUTCHours(12, 0, 0, 0);
            const endOfDay = new Date();
            endOfDay.setUTCDate(endOfDay.getUTCDate() + 1);
            endOfDay.setUTCHours(0, 0, 0, 0);

            const usersWithDonations = await models.User.findAll({
                include: [
                    {
                        model: models.Donation,
                        as: "donations",
                        where: {
                            createdAt: { [Op.between]: [startOfDay, endOfDay] }
                        },
                        required: false
                    }
                ],
                order: [["id", "ASC"]]
            });

            return usersWithDonations.map(user => ({
                userId: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                team_member_id: user.team_member_id || null,
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
}

module.exports = squareService;