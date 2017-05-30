var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var employeeSchema = mongoose.Schema({
  name: String,
  userID: {type: String, required: true, unique: true, uppercase: true},
  position: String,
  department: String,
  country: String,
  city: String,
  email: String,
  phoneNumber: String,
  companyAddress:String,
  office: String,
  fax: String,
  startingHours: String,
  finishingHours: String,
  superiorsUserID: [
    {superiorID: {type: String, uppercase: true}}
    ],
  subordinatesUserID: [
    {subordinateID: {type: String, uppercase: true}}
    ],
  urlImage: String
});

employeeSchema.plugin(uniqueValidator);

var Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
