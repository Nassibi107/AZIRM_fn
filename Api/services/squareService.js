const axios = require("axios");
const { Transactions, Donation, User } = require("../Models");
const { Op, fn, col } = require("sequelize");
const models = require("../Models");

// Load environment variables and moment-timezone
require('dotenv').config();
const moment = require("moment-timezone");

const ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
const BASE_URL = process.env.SQUARE_API_URL;
const timezone = "America/Montreal";



// Helper functions using moment-timezone

function formatStartNoonTZ(date, timezone) {
  return moment.tz(date, timezone)
    .utc() // Convert to UTC explicitly
    .hour(11) // Set to 11:00 AM UTC
    .minute(0)
    .second(0)
    .millisecond(0)
    .toISOString();
}

function formatEndMidnightTZ(date, timezone) {
  return moment.tz(date, timezone)
    .utc()// Convert to UTC explicitly
    .hour(23) // Set to 11:58 PM UTC
    .minute(58)
    .second(0)
    .millisecond(0)
    .toISOString();
}


const squareService = {
  async fetchPayments(date) {
    let currentDate = new Date();
    // Get current day in the specified timezone
    let currentDay = moment(currentDate).tz(timezone).day(); // Sunday=0, Monday=1, etc.
    let daysToSubtract = currentDay === 0 ? 6 : currentDay - 1;

    // Calculate start of week date based on timezone
    let startDate = moment(currentDate).tz(timezone).subtract(daysToSubtract, "days").toDate();
    let formattedStartDate = formatStartNoonTZ(startDate);

    // Calculate end date (6 days ahead) and format it
    let endDate = moment(startDate).tz(timezone).add(6, "days").toDate();
    let formattedEndDate = formatEndMidnightTZ(endDate);

    // For 'now', use today's boundaries
    let todayStart = formatStartNoonTZ(new Date());
    let todayEnd = formatEndMidnightTZ(new Date());
    console.log("startOfWeek:", formattedStartDate);
    console.log("endOfWeek:", formattedEndDate );

    try {
      let allPayments = [];
      let cursor = null;
      let url;

      do {
        if (date === "now") {
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
        if (date !== "now") cursor = response.data.cursor;
      } while (cursor);

      return allPayments;
    } catch (error) {
      console.error("fetchPayments(date)");
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
  async fetchPaymentsByTeamID({ team_member_id }) {
    let currentDate = new Date();
    let formattedStartDate = formatStartNoonTZ(currentDate);
    let formattedEndDate = formatEndMidnightTZ(currentDate);

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
      const startOfDay = moment()
        .tz(timezone)
        .hour(12)
        .minute(0)
        .second(0)
        .millisecond(0)
        .toDate();
      const endOfDay = moment()
        .tz(timezone)
        .add(1, "day")
        .startOf("day")
        .toDate();

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

 async getAllCashWeek() {
    try {
      // Using moment-timezone and isoWeek (Monday as start)
      const startOfWeek = moment().tz(timezone).startOf("isoWeek");
      const endOfWeek = moment().tz(timezone).endOf("isoWeek");

     

const weeklyDonations = await Donation.findAll({
        attributes: [
          [col("user.team_member_id"), "team_member_id"],
          [fn("SUM", col("Donation.amount")), "week_total"]
        ],
        include: [
          {
            model: User,
            as: "user", // Must match the alias in your association
            attributes: []
          }
        ],
        where: {
          createdAt: { [Op.between]: [startOfWeek.toDate(), endOfWeek.toDate()] }
        },
        group: ["user.team_member_id"],
        raw: true,
      });

      return weeklyDonations;
    } catch (error) {
      console.error("Error fetching weekly donations:", error);
      throw error;
    }
  }
};

module.exports = squareService;