var formidable = require('formidable');
var Student = require("../models/Student");


exports.showLogin=function(req,res){
    res.render("login.ejs",{
        page:"login"
    });
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
                    req.session.login = true;
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


exports.showTable=function(req,res){
    console.log("session:"+req.session.login)
    if(req.session.login != true){
        res.redirect("/login");
        return;
    }

    res.send("haha")
}