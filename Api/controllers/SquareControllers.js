const squareService = require("../services/squareService");
const Employee = require("../Models/employeeModel");


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
  try {
      const payments = await squareService.fetchPayments();
      const employees = await squareService.fetchEmployees();

      if (!payments.length || !employees.length) {
          return res.status(404).json({ message: "No data found" });
      }

      // Create employee list
      const employeeMap = {};
      employees.forEach(emp => {
          employeeMap[emp.id] = {
              id: emp.id,
              firstName: emp.first_name,
              lastName: emp.last_name,
              totalPayments: 0
          };
      });

      // Filter and sum payments for card payment source_type only
      payments.forEach(payment => {
          if (payment.team_member_id && payment.source_type === "CARD") {
              if (employeeMap[payment.team_member_id]) {
                  // Add 1% of the payment amount to totalPayments
                  const amountInCents = payment.total_money.amount;  // assuming this is in cents
                  const amountInDollars = amountInCents;
                  employeeMap[payment.team_member_id].totalPayments += amountInDollars ;
              }
          }
      });
      const sortedEmployees = Object.values(employeeMap).sort((a, b) => b.totalPayments - a.totalPayments);

      res.status(200).json(sortedEmployees);
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
};