

exports.showAdminDashboard=function(req,res){
    res.render("admin/index.ejs",{
        page:"index"
    });
}

exports.showAdminReport=function(req,res){
    res.render("admin/report.ejs",{
        page:"report"
    });
}