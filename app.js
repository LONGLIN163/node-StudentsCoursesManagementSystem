var express=require("express");
var mongoose=require("mongoose");
var session=require("express-session");


//Create express app obj
var app = express();
//Connect to database
mongoose.connect('mongodb://localhost/ElectiveCoursesSystemDB', {useNewUrlParser: true});

//Set model engine
app.set("view engine","ejs");


//Create middlewares
// app.get('/', function(req, res){
//     res.send('Hello World');
// });

//Set static file
app.use(express.static("public"));
//Set 404 info page
app.use(function(req,res){
    res.send("404! The page doesn't exist!!!");
})


app.listen(3000);
console.log("The app is running on 3000!")