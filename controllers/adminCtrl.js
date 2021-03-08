

exports.showAdminDashboard=function(req,res){
    res.render("admin/index.ejs",{
        page:"index"
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