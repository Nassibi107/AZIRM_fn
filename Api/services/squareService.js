const axios = require("axios");
const { Transactions, Donation, User } = require("../Models");
const { Op, fn, col , literal , Sequelize  } = require("sequelize");
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
  
    function formatStartNoonTZc(date, timezone) {
      return moment.tz(date, timezone)
        .utc() // Convert to UTC explicitly
        .hour(11) // Set to 11:00 AM UTC
        .minute(0)
        .second(0)
        .millisecond(0)
        .toISOString();
    }
    
    function formatEndMidnightTZc(date, timezone) {
      return moment.tz(date, timezone)
        .utc()// Convert to UTC explicitly
        .hour(23) // Set to 11:58 PM UTC
        .minute(58)
        .second(0)
        .millisecond(0)
        .toISOString();
    }

    let currentDate = moment().tz(timezone);
    let currentDay = currentDate.day(); // Sunday=0, Monday=1, etc.
    let daysToSubtract = currentDay === 0 ? 6 : currentDay - 1;
    
    // Ensure timezone is correctly applied when calculating the start of the week
    let startDate = currentDate.clone().subtract(daysToSubtract, "days").startOf('day');
    let formattedStartDate = formatStartNoonTZ(startDate.toDate());
    
    // Calculate end date (6 days ahead) and format it
    let endDate = startDate.clone().add(6, "days").endOf('day');
    let formattedEndDate = formatEndMidnightTZ(endDate.toDate());
    
    console.error("startOfWeek:", formattedStartDate);
    console.error("endOfWeek:", formattedEndDate);
    let todayStart = formatStartNoonTZc(new Date());
    let todayEnd = formatEndMidnightTZc(new Date());
    console.error("todayStart:", todayStart);
    console.error("todayEnd:", todayEnd);

    try {
      let allPayments = [];
      let cursor = null;
      let url;

      do {
        if (date === "now") {
          url = `${BASE_URL}/payments?begin_time=${encodeURIComponent(todayStart)}&end_time=${encodeURIComponent(todayEnd)}`;
          console.log("fetchPayments(date) urlz", url);
          cursor = null;
        } else {
          url = `${BASE_URL}/payments?begin_time=${encodeURIComponent(formattedStartDate)}&end_time=${encodeURIComponent(formattedEndDate)}`;
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
        .hour(11)
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
        let currentDate = moment().tz(timezone);
        let startDate = currentDate.clone().startOf('isoWeek').startOf('day'); // Gets Monday
        let endDate = startDate.clone().add(6, 'days').endOf('day'); // Gets Sunday

        const weeklyDonations = await Donation.findAll({
            attributes: [
                [col("user.team_member_id"), "team_member_id"],
                [fn("SUM", col("Donation.amount")), "week_total"]
            ],
            include: [
                {
                    model: User,
                    as: "user",
                    attributes: []
                }
            ],
            where: {
                createdAt: { [Op.between]: [startDate.toDate(), endDate.toDate()] }
            },
            group: ["user.team_member_id"],
            raw: true,
        });

        return weeklyDonations;
    } catch (error) {
        console.error("Error fetching weekly donations:", error);
        throw error;
    }
},

async getDonationsSummary(date) {
  try {
    const donationsSummary = await User.findAll({
      attributes: [
        "id",
        "firstName",
        "lastName",
        [Sequelize.fn("DATE", Sequelize.col("donations.createdAt")), "donationDate"],
        [Sequelize.fn("COUNT", Sequelize.col("donations.idD")), "donationCount"],
        [Sequelize.fn("COALESCE", Sequelize.fn("SUM", Sequelize.col("donations.amount")), 0), "totalAmount"],
      ],
      include: [
        {
          model: Donation,
          as: "donations",
          attributes: ["idD", "createdAt", "amount","lat","lng"],
          required: false, // LEFT JOIN
          where: Sequelize.where(
            Sequelize.fn("DATE", Sequelize.col("donations.createdAt")),
            date
          ),
        },
      ],
      group: [
        Sequelize.fn("DATE", Sequelize.col("donations.createdAt")),
        "User.id",
        "donations.idD",
        "donations.createdAt",
        "donations.amount",
      ],
      having: Sequelize.literal("COALESCE(SUM(donations.amount), 0) > 0"),
      order: [[Sequelize.literal("COALESCE(SUM(donations.amount), 0)"), "DESC"]],
      raw: false, // Keep raw false to maintain object structure
    });
    console.log("donationsSummary", donationsSummary);
    return donationsSummary.map(user => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      donationDate: user.donations[0].createdAt,
      donationCount:  user.donations.length,
      totalAmount: user.donations.reduce((sum, d) => sum + parseFloat(d.amount), 0),
      donations: user.donations.map(d => ({
        id: d.idD,
        createdAt: d.createdAt,
        amount: d.amount,
        lat: d.lat,
        lng: d.lng,
      })),
    }));
  } catch (error) {
    console.error("Error fetching donations summary:", error);
    throw error;
  }
}
};

module.exports = squareService;