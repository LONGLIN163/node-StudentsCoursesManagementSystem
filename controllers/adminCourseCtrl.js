var formidable = require('formidable');
var path = require("path");// use for get extensions
var fs = require("fs");
var url = require("url");
var Course = require("../models/Course");
const { json } = require('express');
var mongoose=require("mongoose");

exports.showAdminCourse=function(req,res){
    res.render("admin/course.ejs",{
        page:"course"
    });
}

//test: course?_search=false&nd=1614792646180&rows=2&page=1&sidx=sid&sord=asc&keyword=
exports.getAllCourses=function(req,res){
    /*
    Student.find({},function(err,results){
        console.log(results)
    })*/
    var rows=parseInt(url.parse(req.url,true).query.rows);
    var page=parseInt(url.parse(req.url,true).query.page);
    //console.log(typeof rows);

    var sidx=url.parse(req.url,true).query.sidx;
    var sord=url.parse(req.url,true).query.sord;
    var sordNumber=sord=="asc"?1:-1;

    var keyword=url.parse(req.url,true).query.keyword;

    // *******************fuzzy query**********************
    var findFilter={};
    if(keyword===undefined || keyword==""){
        var findFilter={};
    }else{
        var regexp=new RegExp(keyword,"g");
        findFilter={
            $or:[
                {"cid":regexp},
                {"name":regexp},
                {"teacher":regexp},
                {"briefintro":regexp}
            ]
        }
    }
    //console.log("findFilter",findFilter);

    Course.count(findFilter,function(err,count){
        var total=Math.ceil(count/rows);
        var sortObj={};
        sortObj[sidx]=sordNumber;

        //Student.find({}).sort(sortObj).limit(rows).skip(rows*page).exec(function(err,results){
            Course.find(findFilter).sort(sortObj).limit(rows).skip(rows*(page-1)).exec(function(err,results){
            //console.log(results)
            res.json({
                "record":count,
                "total":total,
                "page":page,
                "rows":results
            })
        })

    })
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