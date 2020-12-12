const express = require('express');
const http = require('https');
const app_config = require('../config/config');
const User = require('../models/User');
const Classroom = require('../models/Classroom');
const { v1: uuidv1, v4: uuidv4 } = require('uuid');
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
                let userinfo;
                let user = await User.findOne({ googleId: json["sub"]}, (err, doc) => {
                    userinfo = doc;
                    console.log(err);
                });
                if(user) //user already in DB
                {
                    res.end(JSON.stringify({success:true, newUser: false, callback:"/dashboard", data: userinfo}));
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

//IMPORTANT : NOT REQUIRED as per current scenario
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

//Create classroom (method: post, path: /api/create_classroom, body: userid and other class attributes as JSON)
//Body JSON Example => { "userid": <googleid>, "username": <username>, "userimage": <profileimage>, "name": <classname>, "subject": <subject> }
router.post('/create_classroom', (req, res) => {
    console.log('/create_classroom')
    var id = uuidv4();
    let json = req.body;
    //let json = JSON.parse(body);
    const newClass  = {
        class_id: id,
        class_name: json["name"],
        class_subject: json["subject"],
        class_teacher: [{ userid: json["userid"], username: json["username"], userimage: json["userimage"] }]
    }
    classcreate = Classroom.create(newClass);
    //adding class to userinfo
    User.findOne({ googleId : json["userid"], $push : { classes : { class_id: id, class_name: json["name"], class_subject: json["subject"], is_teacher: true } }});
    console.log(newClass);
    res.end(JSON.stringify({success: true, msg: "Class created", classid : id, callback: "/class/"+id, data: (newClass) }));
})

//Get Classroom info (method: get, path:/api/get_classroom/<classid>, body: not required)
router.get('/get_classroom/:id', (req, res) => {
    console.log('/get_classroom/' + req.params.id);
    let id = req.params.id;
    //console.log(id);
    let room = Classroom.findOne({ class_id: id }, (err, doc) => {
        //console.log(err);
        //console.log(doc);
        if(doc)
            res.end(JSON.stringify({success: true, msg: "Class found", data: doc}));
        else
            res.end(JSON.stringify({success: false, msg: "Class not found"}));
    });
    //console.log(room);
    
})

//Join student to classroom (method: post, path:/api/join_classroom, body: student id as google id)
//Body JSON example => { "userid": <googleid>, "username": <username>, "userimage": <profile url> }
router.post('/join_classroom/:id', (req, res) => {
    console.log('/join_classroom/' + req.params.id);
    let id = req.params.id;
    let json = req.body;
    Classroom.findOne({ class_id: id }, (err,doc) => {
        if(doc)
        {
            var list = doc["class_students"];
            var found = list.find((element)=>{
                return element.userid == json["userid"];
            });
            if(found)
                res.end(JSON.stringify({success: false, msg:"Already in class"}));
            else
            {
                Classroom.updateOne({class_id: id}, { $push : { class_students : { userid : json["userid"], username : json["username"], userimage : json["userimage"] } }}, (err, raw) => {
                    console.log(err);
                    //console.log(raw);
                });
                User.updateOne({googleId: json["userid"]}, { $push: { classes : { class_id : id, class_name: doc["class_name"], class_subject: doc["class_subject"] } }}, (err, doc) => {
                    console.log(err);
                    //console.log(doc);
                });
                //console.log("ok");
                res.end(JSON.stringify({success: true, msg: "User added to class", callback: "/class/"+id}));
            }
        }
        else
            res.end(JSON.stringify({success: false, msg: "Class not found"}));
    });
})

//Join student to classroom via invidecode (method: post, path: /api/join_invitecode, body: student info as json body)
//Body JSON Example => { "userid":<googleid>, "username":<username>, "userimage":<profileurl> } 
router.post('/join_invidecode/:code', (req,res) => {
    console.log("/join_invitecode" + req.params.code);
    let code = req.params.code;
    let json = req.body;
    Classroom.findOne({class_invitecode: code}, (err, doc) => {
        if(err)
        {
            console.log(err);
            res.end(JSON.stringify({success: false, msg: "Error occured "+err}));
        }
        if(doc)
        {
            var list = doc["class_students"];
            var found = list.find((element) => {
                return element.userid == json["userid"];
            });
            if(found){
                res.end(JSON.stringify({success:false, msg:"Student already in class"}));
            }
            else{

                Classroom.updateOne({class_invitecode : code}, {$push : { class_students : { userid : json["userid"], username: json["username"], userimage: json["userimage"] }}}, (err, raw) =>{
                    console.log(err);
                });
                User.updateOne({userid:json["userid"]}, {$push : {classes : { class_id: doc["class_id"], class_name: doc["class_name"], class_subject: doc["class_subject"] }}}, (err,raw) =>{
                    console.log(err);
                });
                res.end(JSON.stringify({success: true, msg:"Student added to class", callback:"/class/"+doc["class_id"]}));
            }
        }
        else
            res.end(JSON.stringify({success: false, msg: "Class not found"}));
    })
})

//RandomE testing uuid
router.post('/test', (req, res) => {
    console.log((Math.random()*200000000000).toString(36).split('.')[0]);
    res.end(JSON.stringify({ version1: uuidv1(), version4: uuidv4()}));
})


module.exports = router;