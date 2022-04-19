require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passpoortlocalmongoose = require("passport-local-mongoose");

const app = express();
console.log(process.env.API_KEY);
app.use(bodyParser.urlencoded({extended: true }));

app.use(session({
    secret: "MAMAN NA BISO",
    resave: true,
    saveUninitialized: true,

}));
app.use(passport.initialize());
app.use(passport.session());


app.use(express.static("public"));
app.set('view engine', 'ejs');
mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true});

const userSchema = new mongoose.Schema( {
    email:String,
    password:String,
});
userSchema.plugin(passpoortlocalmongoose);


const User = new mongoose.model("User",userSchema);
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());













app.get("/",function(req,res){
    res.render("home");

}),

app.get("/login" ,function(req, res){

    res.render("login")
});


app.get("/register" ,function(req,res){
    res.render("register");

});
app.post("/register",function(req, res){
    


});
app.post("/login",function(req,res){
    
});




app.listen(3000,function(){
    console.log("ap sucessfully running")
});