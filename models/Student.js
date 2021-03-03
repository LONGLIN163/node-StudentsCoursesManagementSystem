var mongoose = require("mongoose");

//Create schema
var studentSchema = new mongoose.Schema({
    "sid": Number,
    "name":String,
    "grade":String,
    "password":String,
    "changedPassword":{type:Boolean,default:false}
  });

//Read data from excel files and save them to database.
studentSchema.statics.importStudent=function(workSheetsFromFile) {
    var str = "ABDEFGHJKLMNPQRTUVWXYZabdefghijkmnpqrtuvwxyz23456789&$%#@!";
    var gradeArr=["middle1","middle1","middle1","high1","high2","high3"];
    //delete old collection
    mongoose.connection.collections['students'].drop( function() {//delete data from the last database,then save new data into it

        //console.log('collection dropped');
        //Add a new collection.
        for(var i=0;i<6;i++){
            for(var j=1;j<workSheetsFromFile[i].data.length;j++){

                var password="";
                for(var x=0;x<6;x++){
                      password+=str.charAt(parseInt((str.length*Math.random())));
                }

                var s=new Student({
                    "sid" : workSheetsFromFile[i].data[j][0],
                    "name" : workSheetsFromFile[i].data[j][1],
                    "grade" : gradeArr[i],
                    //*****initialize passwords with 8 digits num first*****
                    //"password":parseInt(Math.random()*99999999)
                    "password":password,
                });
                s.save();
            }
        }
    });
  };

//Create model
var Student = mongoose.model('Student', studentSchema);

module.exports=Student;