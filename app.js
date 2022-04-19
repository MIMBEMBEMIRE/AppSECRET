require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const md5 = require("md5");
const app = express();
console.log(process.env.API_KEY);
console.log(md5("123456)"));


app.use(bodyParser.urlencoded({extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');
mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true});
const userSchema = new mongoose.Schema( {
    email:String,
    password:String,
});

const User = new mongoose.model("User",userSchema);




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

    const user1=req.body.username;
    const user2 =md5(req.body.password);
    

    const newUser = new User({email:user1, password:user2});

    newUser.save(function(err){
        if(!err){
            res.render("secrets");
        }

});

});
app.post("/login",function(req,res){
    const username = req.body.username;
    const pass = md5(req.body.password);
    User.findOne({email:username},function(err,founderUSER){
        if(err){
            console.log(err);
        }else{
            if(founderUSER){
                if(founderUSER.user2 ===pass);{
                    res.render("secrets");
                }
            }
        }
    });
});


app.listen(3000,function(){
    console.log("ap sucessfully running")
});