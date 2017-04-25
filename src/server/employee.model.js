var mongoose = require('mongoose');

var employeeSchema = mongoose.Schema({
    name: String,
    position: String,
    department: String,
    superiorName: String,
    subordinateName: String,
    urlImage: String

});

var Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
