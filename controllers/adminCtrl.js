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