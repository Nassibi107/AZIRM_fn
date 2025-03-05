class Employee {
    constructor(id, firstName, lastName) {
        this.id = id;
        this.name = `${firstName} ${lastName}`;
        this.totalPayments = 0;
    }
}

module.exports = Employee;
