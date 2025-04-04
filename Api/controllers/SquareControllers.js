const squareService = require("../services/squareService");
const Employee = require("../Models/employeeModel");
const { Transactions } = require("../Models");
const { Square } = require("square");

const { Op, Sequelize } = require("sequelize");
const { User, Donation , } = require("../Models"); // Adjust path as needed

const axios = require("axios");
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with your actual API key

const mergePaymentsById = (transactions, allCash, searchId) => {
    // Find the transaction by team_member_id
    const transaction = transactions.find(emp => emp.team_member_id === searchId);

    if (!transaction) {
        return `No data found for team_member_id: ${searchId}`;
    }

    // Find the matching cash entry
    const cashEntry = allCash.find(cash => cash.team_member_id === searchId);
    const cashAmount = cashEntry && cashEntry.week_total ? parseFloat(cashEntry.week_total) : 0;

    // Merge and return result
    return {
        team_member_id: transaction.team_member_id,
        name: transaction.name,
        totalPayments: transaction.totalPayments + cashAmount
    };
};

exports.getEmployesSquare = async (req, res) => {
    try{
      const employees = await squareService.fetchEmployees();
      if(!employees.length){
        return res.status(404).json({message: "No data found"});
      }
      res.status(200).json(employees);
    }catch(error){
      console.error("Error:", error);
      res.status(500).json({message: "Internal Server Error"});
}
}

exports.getPayement = async (req, res) => {
   
  try{
    const pay = await squareService.fetchPayments();
    if(!pay.length){
      return res.status(404).json({message: "No data found"});
    }
    res.status(200).json(pay);
  }catch(error){
    console.error("Error:", error);
    res.status(500).json({message: "Internal Server Error"});
  }
}
exports.getTopEmployeesByPayments = async (req, res) => {
    const { date } = req.query;

    try {
        const payments = await squareService.fetchPayments(date);
        const employees = await squareService.fetchEmployees();
        const AllCash = await squareService.getAllCashLive();


    
        if (!payments.length || !employees.length) {
            return res.status(404).json({ message: "No data founds" });
        }

        // Create a map of employees by team_member_id
        const employeeMap = {};
        employees.forEach(emp => {
            employeeMap[emp.id] = new Employee(emp.id, emp.first_name, emp.last_name);
        });

        // Process payments and associate with employees
        payments.forEach(payment => {
            if (
                payment.team_member_id &&
                payment.source_type === "CARD" &&
                payment.status === "COMPLETED"
            ) {
                const amountInDollars = payment.total_money.amount / 100;
                const receiptUrl = payment.receipt_url || "";
                const paymentDate = payment.created_at;

                if (employeeMap[payment.team_member_id]) {
                    const employee = employeeMap[payment.team_member_id];
                    employee.payment.push(amountInDollars);
                    employee.url.push(receiptUrl);
                    employee.date.push(paymentDate);
                }
            }
        });

        // Create a map for total cash donations per employee
        const donationsMap = {};
        AllCash.forEach(user => {
            if (user.team_member_id && Array.isArray(user.donations)) {
                const totalCash = user.donations.reduce(
                    (sum, donation) => sum + (parseFloat(donation.amount) || 0), 0
                );
                donationsMap[user.team_member_id] = totalCash;
            }
        });
        console.error(AllCash)
        // Merge payments and cash donations
        const sortedEmployees = Object.values(employeeMap)
            .map(emp => {
                const cashDonations = donationsMap[emp.id] || 0;
                const totalWithCash = emp.payment.reduce((sum, amount) => sum + amount, 0) + cashDonations;
              return {
                    id: emp.id,
                    name: emp.name,
                    totalPayments: totalWithCash,
                    payments: emp.payment,
                    urls: emp.url,
                    dates: emp.date,
                    cashDonations
                };
            })
            .sort((a, b) => b.totalPayments - a.totalPayments);

        res.status(200).json(sortedEmployees);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};



exports.getPayementsByDate = async (req, res) => {
  const { startDate, endDate } = req.query;
  if (!startDate || !endDate) {
      return res.status(400).json({ message: "startDate and endDate are required" });
  }

  try {
      const payments = await squareService.fetchPaymentsByDate({ startDate, endDate });
      const employees = await squareService.fetchEmployees();
      const employeeMap = {};
      employees.forEach(emp => {
          employeeMap[emp.id] = new Employee(emp.id, emp.first_name, emp.last_name);
      });

      payments.forEach(payment => {
          if (payment.team_member_id && payment.source_type === "CARD" && payment.status === "COMPLETED") {
              const amountInDollars = payment.total_money.amount / 100; 
              const receiptUrl = payment.receipt_url || "";
              const paymentDate = payment.created_at;  // Extract the created_at date

              if (employeeMap[payment.team_member_id]) {
                  const employee = employeeMap[payment.team_member_id];
                  employee.payment.push(amountInDollars);  
                  employee.url.push(receiptUrl);
                  employee.date.push(paymentDate);  // Store the payment date
              }
          }
      });

      const sortedEmployees = Object.values(employeeMap)
          .map(emp => ({
              id: emp.id,
              name: emp.name,
              totalPayments: emp.payment.reduce((sum, amount) => sum + amount, 0), 
              payments: emp.payment,
              urls: emp.url,
              dates: emp.date 
          }))
          .sort((a, b) => b.totalPayments - a.totalPayments);

      res.status(200).json(sortedEmployees);

  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
}


exports.getPayementsByTeamID = async (req, res) => {
    const { team_member_id } = req.query;
    try {
        const payments = await squareService.fetchPaymentsByTeamID({ team_member_id });
        const filteredPayments = payments.filter(payment => 
            payment.team_member_id === team_member_id && 
            payment.source_type === "CARD" && 
            payment.status === "COMPLETED"
        );
        if (!filteredPayments.length) {
            return res.status(404).json({ message: "No completed card payments found for this team member" });
        }
        console.log("Filtered Payments:", filteredPayments);
        const formattedPayments = filteredPayments.map(payment => ({
            created_at: payment.created_at,
            amount: payment.total_money.amount / 100
        }));

        res.status(200).json({
            success: true,
            amount: formattedPayments,
            total : formattedPayments.reduce((sum, amount) => sum + amount.amount, 0)
         });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.getTopEmployeesByPaymentsBackup = async (req, res) => {
    try {
        const payments = await squareService.fetchPayments();
        const employees = await squareService.fetchEmployees();
        const AllCash = await squareService.getAllCashWeek();
        let topWeeKPayementAndCash = [];

        console.error("AllCash:", AllCash);

        await Transactions.destroy({ where: {} });

        if (!payments.length || !employees.length) {
            console.log("No data found");
            return;
        }

        const employeeMap = {};
        employees.forEach(emp => {
            employeeMap[emp.id] = {
                id: emp.id,
                name: `${emp.first_name} ${emp.last_name}`,
                payments: [],
                totalPayments: 0
            };
        });

        payments.forEach(payment => {
            if (payment.team_member_id && payment.source_type === "CARD" && payment.status === "COMPLETED") {
                const amountInDollars = payment.total_money.amount / 100;

                if (employeeMap[payment.team_member_id]) {
                    const employee = employeeMap[payment.team_member_id];
                    employee.payments.push(amountInDollars);
                    employee.totalPayments += amountInDollars;
                }
            }
        });

        const transactionsToInsert = Object.values(employeeMap).map(emp => ({
            team_member_id: emp.id,
            name: emp.name,
            totalPayments: emp.totalPayments
        }));

        // Function to merge transactions with AllCash data
        const mergePaymentsById = (transactions, allCash) => {
            const cashMap = {};
            allCash.forEach(cash => {
                if (cash.team_member_id) {
                    cashMap[cash.team_member_id] = parseFloat(cash.week_total) || 0;
                }
            });
          return transactions.map(emp => ({
                team_member_id: emp.team_member_id,
                name: emp.name,
                totalPayments: emp.totalPayments + (cashMap[emp.team_member_id] || 0)
            }));
        };

        // Loop through all IDs in transactionsToInsert and merge them with AllCash
        topWeeKPayementAndCash = mergePaymentsById(transactionsToInsert, AllCash)
            .sort((a, b) => b.totalPayments - a.totalPayments);
        
            if (topWeeKPayementAndCash.length > 0) {
                await Transactions.bulkCreate(topWeeKPayementAndCash);
                console.log("Transactions inserted successfully");
            }
    } catch (error) {
        console.error("Error:", error);
        console.log("Internal Server Error");
    }
};


exports.getAllCashWeeK = async (req,res) => {
    try{
            const getALL = await squareService.getAllCashWeek();
            if(!getALL.length){
                res.status(404).json({message: "No data found"});
            }
            else {
                res.status(200).json(getALL);
            }
    }catch (error) {
            console.error("Error:", error);
            res.status(500).json({message: "Internal Server Error"});
    }
}

exports.getDonationsByDate = async (req,res) => {
    const { date } = req.query;
    try{
        console.log("Date:", date);
        if (!date) {
            return res.status(400).json({ message: "Date is required" });
        }
        const donationCAsh = await squareService.getDonationsSummary(date);
        if (donationCAsh.length === 0) {
            return res.status(404).json({ message: "No donations found" });
        }
        console.log(donationCAsh);
        res.status(200).json(donationCAsh);

    }catch(error)
    {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.getLaction  = async (req,res) => {
    const { lat, lng } = req.query;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`;
  
    try {
      const response = await axios.get(url);
      res.json(response.data); // Send the API response back to the client
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching address' });
    }
}