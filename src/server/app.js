var express = require('express');
var path = require('path');
var morgan = require('morgan'); // logger
var bodyParser = require('body-parser');

var app = express();
app.set('port', (process.env.PORT || 4200));

app.use('/', express.static(__dirname + '/../../dist'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//logger
app.use(morgan('dev'));

var mongoose = require('mongoose');
mongoose.connect('mongodb://chris391:wingmm@ds123080.mlab.com:23080/clunky');
var db = mongoose.connection;
mongoose.Promise = global.Promise;

// Models
var Employee = require('./employee.model.js');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');

  // APIs
  // select all
  app.get('/employees', function(req, res) {
    // console.log(req.protocol + '://' + req.get('host') + req.originalUrl);//http://localhost:4200/employees
    Employee.find({}, function(err, docs) {
      if(err) return console.error(err);
      res.json(docs);
      // console.log(docs);
    });
  });

  // find by id
  app.get('/employee/:id', function(req, res) {

    Employee.findOne({"userID": req.params.id}, function(err, obj) {
      if(err) return console.error(err);
      res.json(obj);
    })
  });

  // count all
  app.get('/employees/count', function(req, res) {
    Employee.count(function(err, count) {
      if(err) return console.error(err);
      res.json(count);
    });
  });

  // create
  app.post('/employee', function(req, res) {
    var obj = new Employee(req.body);
    // console.log('in app.js');
    // console.log(obj);
    obj.save(function(err, obj) {
      if (err) {
        if(err.name==='ValidationError'){
          res.status(412).json(obj);
          return console.error(err);
        }else {
          res.status(400);
          return console.error(err);
        }
      }
      res.status(200).json(obj);
    });
  });

  // update by id
  app.put('/employee/:id', function(req, res) {
    Employee.findOneAndUpdate({"userID" : req.params.id}, req.body, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    })
  });

  // delete by id
  app.delete('/employee/:id', function(req, res) {
    Employee.findOneAndRemove({"userID": req.params.id}, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    });
  });

  // delete ALL
  app.delete('/employees', function(req, res) {
    Employee.remove({}, function(err) {
      if(err) return console.error(err);
      res.sendStatus(200);
    });
  });


  // all other routes are handled by Angular
  app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/../../src/index.html'));
  });

  app.listen(app.get('port'), function() {
    console.log('Angular 2 Full Stack listening on port '+app.get('port'));
  });
});

module.exports = app;
