const squareService = require("../services/squareService");
const Employee = require("../Models/employeeModel");
const { Transactions } = require("../Models");
const { Square } = require("square");

const { Op, Sequelize } = require("sequelize");
const { User, Donation  } = require("../Models"); // Adjust path as needed

const axios = require("axios");
const CANPOST_API_KEYS = process.env.CANPOST_API_KEY || "YOUR_CANPOST_API_KEY";
require('dotenv').config();

const BASE_URL = 'https://ws1.postescanada-canadapost.ca/AddressComplete/Interactive';


exports.getAddressCanadaPost = async (req, res) => {
    const { searchTerm, lastId } = req.query;

    try {
        console.log(CANPOST_API_KEYS);
      let url = `${BASE_URL}/Find/v2.10/json3.ws?Key=${CANPOST_API_KEYS}&Country=CA`;
  
      if (searchTerm) {
        url += `&SearchTerm=${encodeURIComponent(searchTerm)}`;
      }
      if (lastId) {
        url += `&LastId=${encodeURIComponent(lastId)}`;
      }
  
      const response = await axios.get(url);
      res.json(response.data);
    } catch (error) {
      console.error('Error fetching address data:', error.message);
      res.status(500).json({ error: 'Failed to fetch address suggestions' });
    }

}