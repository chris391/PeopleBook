var mongoose = require('mongoose');

var employeeSchema = mongoose.Schema({
    name: String,
    position: String,
    department: String,
    superiorName: String,
    subordinateName: String

});

var Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
