//jshint:esversion6
const express = require("express");
const app = express();
const parser = require("body-parser");
const mysql = require("mysql");
const route=express.Router();
var obj=require("./question.json");
var i=0;
var count=1;
var rank=0;
var id=0;
app.set("view engine","ejs");


app.use(express.static("public"));
// app.use(express.static("backend"));
app.use(parser.urlencoded({
    extended: true
}));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'quiz'
});
connection.connect(function (error) {
    if (!!error) {
        console.log("error");
    } else {
        console.log("Connected");
        // console.log(obj);
    }

});

app.listen(3000, function (req, res) {
    console.log("app is listening at port 3000");
    // console.log(__dirname);
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/Signin.html");
});
app.get("/Register",function(req,res)
{
    res.sendFile(__dirname+"/Freereg.html");
});
app.get("/Questions",function(req,res)
{
    // console.log(obj);
    // console.log(obj.q1.qtitle);
    // console.log("ejs file is sent");
    var question=""
    res.render("list",{
        Qcode:obj[i].qtitle,
        OptionA:obj[i].a,
        OptionB:obj[i].b,
        OptionC:obj[i].c,
        OptionD:obj[i].d
    });
    
});
app.get("/Quiz",function(req,res)
{
    res.sendFile(__dirname+"/quiz.html");
});

app.post("/", function (req, res) {
    var btn = req.body.next;
    var btn2 = req.body.reg;
    if (btn === "signin") {
        var mail = String(req.body.mail);
        var pwd = String(req.body.pwd);
        connection.query("select * from person where email_id=? AND password=?", [mail, pwd], function (err, result, fields) {
            if (result.length > 0) {
                rank=result[0].current_year_of_studying;
                console.log(rank);
                res.redirect("/Quiz")
            } else {
                res.redirect("/");
            }
        });
    } else {
        res.redirect("/Register");
    }
});
app.post("/Register", function (reqs, ress) {
    var full_name = String(reqs.body.fname + " " + reqs.body.lname);
    var pwd1 = String(reqs.body.pwd);
    var email = String(reqs.body.email);
    var pno = Number(reqs.body.phoneNum);
    var qual = Number(reqs.body.qualification);
    console.log(full_name + " " + pwd1 + " " + email + " " + pno + " " + qual);
    connection.query("insert into person(name,email_id,password,phone_no,current_year_of_studying) values(" + "'" + full_name + "'" + "," + "'" + email + "'" + "," + "'" + pwd1 + "'" + "," + pno + "," + qual + ");", function (errr, results, field) {
        if (!!errr) {
            console.log(errr);
        } else {
            console.log(results);
            ress.sendFile(__dirname + "/Signin.html");
        }
    });
});
app.post("/Quiz",function(req,res)
{
    res.redirect("/Questions");
});
app.post("/Questions",function(req,res)
{   
    var q1=req.body.answer1;
    var q2=req.body.answer2;
    var q3=req.body.answer3;
    var q4=req.body.answer4;
    if(q1==="a")
    {
        console.log("a was clicked");
        connection.query("select * from questions1 where q_id=?;",[i+1],function(err,res,fields){
        console.log(res[1] + "Hello");
        var score=Number(res[0].a);
        console.log(score);
        if(score===null)
        {
            score=Number(rank);
            connection.query("update questions1 set b=? where q_id=?;",[score,i+1],function(req,res,err){
                console.log(res);
            });
            score=0;
        }
        else
        {
            score=Number(score)+Number(rank);
            console.log(score);
            connection.query("update questions1 set a=? where q_id=?;",[score,i+1],function(err,res,fields){
                console.log(res);
            });
            score=0;
        }
        
        });
        
        
        
    }
    if(q2==="b")
    {
        console.log("b was clicked");
        connection.query("select b from questions1 where q_id=?;",[i+1],function(req,res,err){
            // console.log(res);
        var score=Number(res[0].b);
        console.log(score);
        if(score===null)
        {
            score=Number(rank);
            connection.query("update questions1 set b=? where q_id=?;",[score,i+1],function(req,res,err){
                console.log(res);
            });
        }
        else
        {
            score=Number(score)+Number(rank);
            console.log(score);
            connection.query("update questions1 set b=? where q_id=?;",[score,i+1],function(req,res,err){
                console.log(res);
            });
            score=0;
        }
        
        });
    }
    if(q3==="c")
    {
        console.log("c was clicked");
        connection.query("select c from questions1 where q_id=?;",[i+1],function(req,res,err){
            // console.log(res);
        var score=Number(res[0].c);
        console.log(score);
        if(score===null)
        {
            score=0;
        }
        else
        {
            score=Number(score)+Number(rank);
            console.log(score);
            connection.query("update questions1 set c=? where q_id=?;",[score,i+1],function(req,res,err){
                console.log(res);
            });
            score=0;
        }
        
        });
    }
    if(q4==="d")
    {
        console.log("d was clicked");
        connection.query("select b from questions1 where q_id=?;",[i+1],function(req,res,err){
            // console.log(res);
        var score=Number(res[0].d);
        console.log(score);
        if(score===null)
        {
            score=0;
        }
        else
        {
            score=Number(score)+Number(rank);
            console.log(score);
            connection.query("update questions1 set d=? where q_id=?;",[score,i+1],function(req,res,err){
                console.log(res);
            });
            score=0;
        }
        
        });
    }
    i++;
    console.log(i);
    console.log(q1+" "+q2+" "+q3+" "+q4);
    res.render("list",{
        Qcode:obj[i].qtitle,
        OptionA:obj[i].a,
        OptionB:obj[i].b,
        OptionC:obj[i].c,
        OptionD:obj[i].d,

    });if(i<11)
    {
        res.redirect("/Questions");
    }
    else{
        res.redirect("/Quiz")
    }

})
