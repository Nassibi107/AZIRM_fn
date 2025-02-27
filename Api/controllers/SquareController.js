const { Client, environments } = require("square"); 
require("dotenv").config();

if (!process.env.SQUARE_ACCESS_TOKEN) {
  throw new Error("SQUARE_ACCESS_TOKEN is not set in the environment variables");
}

const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN, // Set this in your .env file
  environment: environments.sandbox, // Change to environments.production when live
});

const paymentsApi = squareClient.paymentsApi;
const customersApi = squareClient.customersApi;

exports.paymentsApInfo = async (req, res) => {
  try {
    const response = await paymentsApi.listPayments();
    const payments = response.result.payments;

    const paymentDetails = await Promise.all(
      payments.map(async (payment) => {
        const customerId = payment.customerId;
        let email = "No Email";

        if (customerId) {
          try {
            const customer = await customersApi.retrieveCustomer(customerId);
            email = customer.result.customer.emailAddress || "No Email";
          } catch (error) {
            console.error(`Error fetching customer with ID ${customerId}:`, error);
          }
        }

        return {
          id: payment.id,
          amount: payment.amountMoney.amount,
          currency: payment.amountMoney.currency,
          email,
        };
      })
    );

    res.status(200).json(paymentDetails);
  } catch (error) {
     console.error("Error retrieving payments:", error);
    res.status(500).json({ error: "Error retrieving payments" });
  }
};