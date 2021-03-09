var formidable = require('formidable');
var Student = require("../models/Student");


exports.showLogin=function(req,res){
    res.render("login.ejs",{
        page:"login"
    });
}

exports.doLogout=function(req,res){
    req.session.login = false;
    req.session.name = "";
    res.redirect("/login");
    return;
}

exports.doLogin=function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        if(err){
            res.json({"result":-1});//-1: server error
            return;
        }
        var sid=fields.sid;
        var password=fields.password;
        //console.log(sid,password)

        Student.find({"sid":sid},function(err,results){
            if(err){
                res.json({"result":-1});//-1: server error
                return;
            }
            if(results.length==0){
              res.json({"result":-2});//-2: no such student
              return;
            }

            //if this student exist, then check if she / he had change pwd
            var changedPassword=results[0].changedPassword;
            if(!changedPassword){
                //if this student hasnt changed pwd, then compares with the password from the resigter filed's pwd
                if(results[0].password===password){
                    //********if login success, send a session to the user,it has be in front json result***********
                    req.session.login=true;
                    // mean while keep info in session
                    req.session.sid=sid;
                    req.session.name = results[0].name;
                    req.session.changedPassword = false;
                    req.session.grade = results[0].grade;
                    res.json({"result":1});//1: login success
                   
                    return;
                }else{
                    res.json({"result":-3});//-2:username exist, but your pwd is wrong
                    return;
                }

               
            }else{
                //if this student has changed pwd, then use MD5 encrypt the password from the resigter form,then compare with the pwd in the database

            }

        })
    })
}


exports.showIndex=function(req,res){
    console.log("session:"+req.session.login)
    if(req.session.login != true){
        res.redirect("/login");
        return;
    }
    // if use dont chang the initial pwd, we dont allow them to see home, force them direct to changepwd page
    if(req.session.changedPassword == false){
        res.redirect("/changePwd");
        return;
    }

    // present home page
    res.render("index.ejs",{
        sid:req.session.sid,
        name:req.session.name
    });

}

exports.showChangePwd=function(req,res){
    if(req.session.login != true){
        res.redirect("/login");
        return;
    }
    res.render("changePwd.ejs",{
        sid:req.session.sid,
        name:req.session.name,
        showTip:!req.session.changedPassword
    });
}


exports.doChangePwd=function(req,res){
    console.log("doChangePwd-pwd:")
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
        var password=fields.password;
        console.log("doChangePwd-pwd:",password)
        Student.find({"sid":req.session.sid},function(err,results){

            var thestudent=results[0];

            thestudent.changedPassword=true;
            req.session.changedPassword = true;
            thestudent.password=password;

            thestudent.save();
            res.json({"result":1});
        })
    })
}