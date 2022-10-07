import express from 'express';
const app = express();
import bodyParser from 'body-parser';
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
import https from "https";
var fs = require('fs');
app.get("/",function(req,res){
    res.sendFile(__dirname+"/public/signup.html");
})

const secrets = require("./secret.js")
const userid = secrets.userid;
const apikey = secrets.apikey;

app.post("/",function(req,res){
   const fname = req.body.fname;
   const lname = req.body.lname;
   const email = req.body.email;
   const data = {
    members: [
        {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fname,
                LNAME: lname
            }
        }
    ]
   }
   const jsonData = JSON.stringify(data);
   const url = "https://us17.api.mailchimp.com/3.0/lists/a0b29ca34d";
   const options = {
      method: "POST",
      auth: "Amangupta:62b7311f915cbfcc6d637a356f5d8bb6-us17"
   }
   const request = https.request(url,options, function(response){
//   console.log(response);
      if(response.statusCode===200)
      {
        res.sendFile(__dirname + "/public/success.html");
      }
      else
      {
        res.sendFile(__dirname + "/public/failure.html");
      }
       response.on("data",function(data){
        
       })
   })
   app.post("/failure",function(req,res){
    res.redirect("/");
   })
   app.post("/success",function(req,res){
    res.redirect("/");
   })
   request.write(jsonData);
   request.end();
})
app.listen(3000 || process.env.PORT,()=>{
    console.log("server started");
})