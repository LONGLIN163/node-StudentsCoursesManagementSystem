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