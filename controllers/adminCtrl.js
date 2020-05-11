var formidable = require('formidable');


exports.showAdminDashboard=function(req,res){
    res.render("admin/index.ejs",{
        page:"index"
    });
}

//-------------------------------- 
exports.showAdminStudent=function(req,res){
    res.render("admin/student.ejs",{
        page:"student"
    });
}
exports.showAdminStudentExport=function(req,res){
    res.render("admin/student/studentexport.ejs",{
        page:"studentexport"
    });
}
exports.showAdminStudentImport=function(req,res){
    res.render("admin/student/studentimport.ejs",{
        page:"studentimport"
    });
}
// Excute excel uploading
exports.doAdminStudentImport=function(req,res){

    var form = new formidable.IncomingForm();
    form.uploadDir = "./uploads";
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
    //   res.writeHead(200, {'content-type': 'text/plain'});
    //   res.write('received upload:\n\n');
    //   res.end(util.inspect({fields: fields, files: files}));
    });

    console.log("ok");
}
//-------------------------------- 
exports.showAdminCourse=function(req,res){
    res.render("admin/course.ejs",{
        page:"course"
    });
}

exports.showAdminStatement=function(req,res){
    res.render("admin/statement.ejs",{
        page:"statement"
    });
}