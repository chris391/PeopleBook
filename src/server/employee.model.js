var mongoose = require('mongoose');

var employeeSchema = mongoose.Schema({
  name: String,
  userID: String,
  position: String,
  department: String,
  country: String,
  city: String,
  email: String,
  phoneNumber: String,
  companyAddress:String,
  office: String,
  fax: String,
  workingHours: String,
  superiorsUserID: [{superiorID: String}],
  subordinatesUserID: [],
  urlImage: String
});

var Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
