var formidable = require('formidable');
var path = require("path");// use for get extensions
var fs = require("fs");
var xlsx =require('node-xlsx');
var Student = require("../models/Student");

exports.showAdminDashboard=function(req,res){
    res.render("admin/index.ejs",{
        page:"index"
    });
}

exports.showAdminStudent=function(req,res){
    res.render("admin/student.ejs",{
        page:"student"
    });
}


exports.showAdminStudentImport=function(req,res){
    res.render("admin/student/import.ejs",{
        page:"student"
    });
}

// Excute excel uploading
exports.doAdminStudentImport=function(req,res){

    var form = new formidable.IncomingForm();
    form.uploadDir = "./uploads";
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        //console.log("------",files.studentExcel)
        if(!files.studentExcel){
            res.send("Please choose a correct excel file to upload!");
            return;
        }else if(path.extname(files.studentExcel.name)!=".xlsx"){// file type validation by extension
            //delete the illegal file
            fs.unlink("./"+files.studentExcel.path,function(err){
                if(err){
                    console.log("Fail to delete file!");
                    return;
                }
                res.send("Uploading illegal file, the file has been deleted from server!");
            });
            return;
        }
        //read this .xlsx file use plugin'node-xlsx',this ia a sync statement
        var workSheetsFromFile = xlsx.parse("./"+files.studentExcel.path);
        //Check if the array match 
        //console.log("workSheetsFromFile:",workSheetsFromFile)
        console.log("workSheetsFromFileLen:",workSheetsFromFile.length)

        if(workSheetsFromFile.length!=6){
            res.send("U r missing sub tables!!!");
            return;
        }
        for(var i=0;i<6;i++){
            console.log("0---"+workSheetsFromFile[i].data[0][0]);
            console.log("1---"+workSheetsFromFile[i].data[0][1]);
            if(
                workSheetsFromFile[i].data[0][0]!="sid"||
                workSheetsFromFile[i].data[0][1]!="name"
                ){
                res.send("No."+i +" table's th is incorrect!");
                return;
            }
        }
        //Use mongoose to save data to database
        Student.importStudent(workSheetsFromFile);

        res.send("Upload success!!!")

    });

}


exports.showAdminCourse=function(req,res){
    res.render("admin/course.ejs",{
        page:"course"
    });
}

exports.showAdminReport=function(req,res){
    res.render("admin/report.ejs",{
        page:"report"
    });
}