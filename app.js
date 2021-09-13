const express = require("express");
//const { read } = require("fs");
const https = require("https");
const request = require("request");
const bodyParser = require("body-parser");



const app = express();
app.use(express.urlencoded({extended:true})); 

app.use(express.static("public"));


app.get("/", function(req,res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
        };
        const jsonData = JSON.stringify(data);
        
        const url = "https://us5.api.mailchimp.com/3.0/lists/18098d5021"

        const options = {
            method: "POST",
            auth: "-------"
        };

        const request = https.request(url, options, function(response) {
            
            if(response.statusCode === 200){
                res.sendFile(__dirname + "/success.html");
            }else {
                res.sendFile(__dirname + "/failure.html");
            }
            
            response.on("data", function(data) {
                console.log(JSON.parse(data));
                
            });
        });

        request.write(jsonData);
        request.end();
    });

    app.post("/failure", function(req,res) {
        res.redirect("/");
    })


app.listen(process.env.PORT || 3000, function (){
    console.log("Server is running on port " + process.env.PORT);
});


//API key
// ea0344b0cfb46fd0ff6d8a0f1ac4940f-us5  this las number is the X in usX

// audience list-id 18098d5021

