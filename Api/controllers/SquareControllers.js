const squareService = require("../services/squareService");
const Employee = require("../Models/employeeModel");
const { Transactions } = require("../Models");

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
            return res.status(404).json({ message: "No data found" });
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

        const formattedPayments = filteredPayments.map(payment => ({
            created_at: payment.created_at,
            amount: payment.amount_money.amount / 100
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

 // Ensure the correct path

exports.getTopEmployeesByPaymentsBackup = async (req, res) => {
    try {

        const payments = await squareService.fetchPayments();
        const employees = await squareService.fetchEmployees();
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
        })).sort((a, b) => b.totalPayments - a.totalPayments);

        if (transactionsToInsert.length > 0) {
            await Transactions.bulkCreate(transactionsToInsert);
            console.log("Transactions inserted successfully");
        }

    } catch (error) {
        console.error("Error:", error);
      console.log("Internal Server Error");
    }
};
