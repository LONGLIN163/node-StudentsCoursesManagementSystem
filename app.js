var express=require("express");
var mongoose=require("mongoose");
var session=require("express-session");

var adminCtrl=require("./controllers/adminCtrl");
var adminStudentCtrl=require("./controllers/adminStudentCtrl");
var adminCourseCtrl=require("./controllers/adminCourseCtrl");

//Create express app obj
var app = express();
//Connect to database
mongoose.connect('mongodb://localhost/scdb', {useNewUrlParser: true});
//mongoose.connect('mongodb://localhost/scdb', { useUnifiedTopology: true });
//Use session
//Use session
app.use(session({
    secret: 'studnetCourseSystemDB',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))

//Set model engine
app.set("view engine","ejs");
//Middlewares,routers
app.get('/admin'                 ,adminCtrl.showAdminDashboard);
app.get('/admin/student'         ,adminStudentCtrl.showAdminStudent);

app.get('/admin/student/import'  ,adminStudentCtrl.showAdminStudentImport);
app.post('/admin/student/import' ,adminStudentCtrl.doAdminStudentImport);
app.get('/admin/student/download',adminStudentCtrl.downloadStudentXlsx);

app.get('/admin/student/add'     ,adminStudentCtrl.showAdminStudentAdd);
app.post('/student'              ,adminStudentCtrl.addStudent); //add a student
app.delete('/student'            ,adminStudentCtrl.deleteStudent); //delete a student
app.propfind('/student/:sid'     ,adminStudentCtrl.checkStudentExist)
app.get('/student'               ,adminStudentCtrl.getAllStudents); //get all students
app.post('/student/:sid'         ,adminStudentCtrl.updateStudent); //modify some student

app.get('/admin/course'          ,adminCourseCtrl.showAdminCourse);
app.get('/admin/course/import'   ,adminCourseCtrl.showAdminCourseImport);
app.post('/admin/course/import'  ,adminCourseCtrl.doAdminCourseImport);
app.get('/admin/course/add'      ,adminCourseCtrl.showAdminCourseAdd);

app.get('/course'                ,adminCourseCtrl.getAllCourses); //get all students

app.get('/admin/report'          ,adminCtrl.showAdminReport);

//Set static file
app.use(express.static("public"));
//Set 404 info page
/*
app.use(function(req,res){
    res.send("404! The page doesn't exist!!!");
})*/


app.listen(3000);
console.log("The app is running on 3000!")