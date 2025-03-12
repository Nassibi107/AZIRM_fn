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
              dates: emp.date  // Include the dates in the response
          }))
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
              dates: emp.date  // Include the dates in the response
          }))
          .sort((a, b) => b.totalPayments - a.totalPayments);

      res.status(200).json(sortedEmployees);

  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
}