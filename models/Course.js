var mongoose = require("mongoose");

//Create schema
var courseSchema = new mongoose.Schema({
    "cid" : String,
    "name" : String,
    "dayofweek" : String,
    "number" : Number,
    "allow" : [String],
    "teacher" : String,
    "briefintro" : String,
    "mystudents":[String]
  });


//Create model
var Course = mongoose.model('Course', courseSchema);

module.exports=Course;