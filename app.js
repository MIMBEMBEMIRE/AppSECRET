
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const res = require("express/lib/response");
const app = express();


app.use(bodyParser.urlencoded({extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');
mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true});
const userSchema = {
    email:String,
    password:String,
};

const User=new mongoose.model("User",userSchema);

app.get("/" ,function(req,res){
    res.render("home")

})

app.get("/login" ,function(req,res){
    res.render("login");

})


app.get("/register" ,function(req,res){
    res.render("register");

});
app.post("/register",function(req, res){

    const user1=req.body.username;
    const user2 = req.body.password;
    

    const newUser = new User({email:user1, password:user2});

    newUser.save(function(err){
        if(!err){
            res.render("secrets");
        }

});

});
app.post("/login",function(req,res){
    const username = req.body.username;
    const pass = req.body.password;
    User.findOne({email:username},function(err,founderUSER){
        if(err){
            console.log(err);
        }else{
            if(founderUSER){
                if(founderUSER.password ===pass);{
                    res.render("secrets");
                }
            }
        }
    });
});


app.listen(3000,function(){
    console.log("ap sucessfully running")
});