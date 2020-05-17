var mongoose = require("mongoose");

//Create schema
var studentSchema = new mongoose.Schema({
    "sid": Number,
    "name":String,
    "grade":Number
  });

//Read data from excel files and save them to database.
studentSchema.statics.importStudent=function(workSheetsFromFile) {
    //delete old collection
    mongoose.connection.collections['students'].drop( function() {
        console.log('collection dropped');
        //Add a new collection.
        for(var i=0;i<6;i++){
            for(var j=1;j<workSheetsFromFile[i].data.length;j++){
    
                var s=new Student({
                    "sid" : workSheetsFromFile[i].data[j][0],
                    "name" : workSheetsFromFile[i].data[j][1],
                    "grade" : i+1
                });
                s.save();
            }
        }
    });
  };

//Create model
var Student = mongoose.model('Student', studentSchema);

module.exports=Student;