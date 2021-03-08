var formidable = require('formidable');
var path = require("path");// use for get extensions
var fs = require("fs");
var Course = require("../models/Course");
const { json } = require('express');
var mongoose=require("mongoose");

exports.showAdminCourse=function(req,res){
    res.render("admin/course.ejs",{
        page:"course"
    });
}

exports.showAdminCourseImport=function(req,res){
    res.render("admin/course/import.ejs",{
        page:"course"
    });
}
// Excute json uploading
exports.doAdminCourseImport=function(req,res){
    var form = new formidable.IncomingForm(); 
    form.uploadDir = "./uploads";
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        //get the file
        fs.readFile(files.courseJson.path, function read(err, data) {
           //console.log("lessions---",data.toString()); 
           var dataobj=JSON.parse(data.toString());

           //empty database then insert
           mongoose.connection.collection("courses").drop(function(){
               //*************cool! insert data directly****************
               Course.insertMany(dataobj.courses,function(data,r){
                   //console.log("r---",r)
                   if(err){
                    res.send("Upload failed")// this is sync insert, so use send directly
                   }
                   res.send("Success upload "+r.length+" documents courses data.")// this is sync insert, so use send directly
               })
           })
        });
    });
}

exports.showAdminCourseAdd=function(req,res){
    res.render("admin/course/add.ejs",{
        page:"course"
    });
}