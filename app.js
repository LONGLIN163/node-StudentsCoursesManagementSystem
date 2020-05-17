var express=require("express");
var mongoose=require("mongoose");
var session=require("express-session");
// 
var adminCtrl=require("./controllers/adminCtrl");


//Create express app obj
var app = express();
//Connect to database
mongoose.connect('mongodb://localhost/ElectiveCoursesSystemDB', {useNewUrlParser: true});
//Use session
app.use(session({
    secret: 'ElectiveCoursesSystemDB',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

//Set model engine
app.set("view engine","ejs");
app.get('/admin',adminCtrl.showAdminDashboard);
app.get('/admin/student',adminCtrl.showAdminStudent);
app.get('/admin/student/import',adminCtrl.showAdminStudentImport);
app.post('/admin/student/import',adminCtrl.doAdminStudentImport);

app.get('/admin/course',adminCtrl.showAdminCourse);
app.get('/admin/statement',adminCtrl.showAdminStatement);


//Set static file
app.use(express.static("public"));
//Set 404 info page
app.use(function(req,res){
    res.send("404A! The page doesn't exist!!!");
})


app.listen(3000);
console.log("The app is running on 3000!")