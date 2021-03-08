var formidable = require('formidable');
var path = require("path");// use for get extensions
var fs = require("fs");
var Course = require("../models/Course");

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
            if (err) {
                throw err;
            }
           console.log("lessions:",data.toString);
        });
    });
}

exports.showAdminCourseAdd=function(req,res){
    res.render("admin/course/add.ejs",{
        page:"course"
    });
}