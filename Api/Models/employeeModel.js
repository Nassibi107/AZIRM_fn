class Employee {
    constructor(id, firstName, lastName , url) {
        this.id = id;
        this.name = `${firstName} ${lastName}`;
        this.payment = [];
        this.url = [];
        this.date = [];  // Store dates of payments
        this.data = [];
    }
}

module.exports = Employee;
