const express = require('express');
const http = require('https');
const app_config = require('../config/config');
const User = require('../models/User');
const router = express.Router();

//Login (method: get, path:/api/login)
router.get('/login', (req, res) => {
    res.end(JSON.stringify({ success : false, msg: "Cannot get /api/login" }));
})

//Login (method: post, path:/api/login, body: Google.OAuth.TokenId as json)
//Body JSON example => { "tokenid": <tokenid> }
router.post('/login', async (req, res) => {
    //console.log("post");
    //console.log(req.body);
    let b = req.body;    
    await http.get(app_config["google_outh_fetch"]+b["tokenid"],
    async (response) => {
        let body = "";
        response.on("data", (chunk) => {
            body += chunk;
        });
        
        response.on("end", async () => {
            try {
                let json = JSON.parse(body);
                const newUser = {
                    googleId: json["sub"],
                    username: json["name"],
                    firstName: json["given_name"],
                    lastName: json["family_name"],
                    emailId: json["email"],
                    imageUrl: json["picture"]
                }
                //DB CRUD operations
                //Checking if user exist
                let user = await User.findOne({ googleId: json["sub"]});
                if(user) //user already in DB
                {
                    res.end(JSON.stringify({success:true, newUser: false, callback:"/dashboard"}))
                }
                else
                {
                    user = await User.create(newUser); //inserting into DB
                    res.end(JSON.stringify({success: true, newUser: true, callback:"/dashboard"}))
                }
            } catch(error){
                console.error(error.message);
                
                res.end(JSON.stringify({ success : false, msg: error.message, callback: "/login" }));
            };
        });
    }).on("error", (error) => {
        console.error(error.message);        
        res.end(JSON.stringify({ success : false, msg: error.message, callback: "/login" }));
    });
    
})

//Update usertype (method: post, path: /api/update_type, body: usertype & userid as JSON)
//BODY Json Example => { "userId": <googleid>, "userType": <usertype> } 
// Usertype => teacher | student
router.post('/update_type', (req, res) => {
    console.log('/update_type')
    let body = req.body;
    User.updateOne( {googleId:body["userId"]}, 
    { userType:body["userType"] }, 
    (err, doc) => {
        if(err){
            console.error(err);
            res.end(JSON.stringify({success: false, msg: err}));
        }
        else{
            console.log("Updated document => ", doc);
            res.end(JSON.stringify({success: true, msg: "Usertype updated"}));
        }
    });
})


module.exports = router;