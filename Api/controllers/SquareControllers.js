const squareService = require("../services/squareService");
const Employee = require("../models/employeeModel");

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
            employeeMap[emp.id] = new Employee(emp.id, emp.first_name, emp.last_name);
        });

        // Sum payments per employee
        payments.forEach(payment => {
            if (payment.team_member_id && employeeMap[payment.team_member_id]) {
                employeeMap[payment.team_member_id].totalPayments += payment.amount_money.amount;
            }
        });

        // Convert to array and sort by total payments
        const sortedEmployees = Object.values(employeeMap).sort((a, b) => b.totalPayments - a.totalPayments);

        res.status(200).json(sortedEmployees);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
