
require('dotenv').config();

const axios = require("axios");
const  SQUARE_API_URL = process.env.SQUARE_API_URL;
const  SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN;
  // Get all team members
  exports.getTeamMembers = async (req, res) => {
    try {
    console.log(SQUARE_ACCESS_TOKEN)
    console.log(SQUARE_API_URL)
    const response = await axios.get(`${SQUARE_API_URL}/team-members/THE_WRONG_ID`, { 
        headers: { Authorization: `Bearer ${SQUARE_ACCESS_TOKEN}` }
      });

      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: error.response?.data || error.message });
    }
  };
  
  // Get all payments for all team members
  exports.getAllTeamMemberPayments = async (req, res) => {
    try {
      // First get all team members
      const teamResponse = await squareClient.teamApi.listTeamMembers();
      const teamMembers = teamResponse.result.teamMembers;
      
      // Then get payments for each team member
      const paymentsPromises = teamMembers.map(async (member) => {
        const paymentResponse = await squareClient.paymentsApi.listPayments({
          teamMemberId: member.id,
        });
        
        return {
          teamMember: member,
          payments: paymentResponse.result.payments || []
        };
      });
      
      const teamMemberPayments = await Promise.all(paymentsPromises);
      res.json(teamMemberPayments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
