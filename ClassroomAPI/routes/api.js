const express = require('express');
const http = require('https');
const app_config = require('../config/config');
const User = require('../models/User');
const Classroom = require('../models/Classroom');
const Quiz = require('../models/Quiz');
const Notice = require('../models/Notice');
const Feed = require('../models/Post');
const Attendance = require('../models/Attendance');
const { v1: uuidv1, v4: uuidv4 } = require('uuid');
const router = express.Router();

//Login (method: get, path:/api/login)
router.get('/login', (req, res) => {
    res.end(JSON.stringify({ success: false, msg: "Cannot get /api/login" }));
})

//Login (method: post, path:/api/login, body: Google.OAuth.TokenId as json)
//Body JSON example => { "tokenid": <tokenid> }
router.post('/login', async(req, res) => {
    //console.log("post");
    //console.log(req.body);
    let b = req.body;
    await http.get(app_config["google_outh_fetch"] + b["tokenid"],
        async(response) => {
            let body = "";
            response.on("data", (chunk) => {
                body += chunk;
            });

            response.on("end", async() => {
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
                    let user = await User.findOne({ googleId: json["sub"] }, (err, doc) => {
                        userinfo = doc;
                        console.log(err);
                    });
                    if (user) //user already in DB
                    {
                        res.end(JSON.stringify({ success: true, newUser: false, callback: "/dashboard", data: userinfo }));
                    } else {
                        user = await User.create(newUser); //inserting into DB
                        res.end(JSON.stringify({ success: true, newUser: true, callback: "/dashboard" }))
                    }
                } catch (error) {
                    console.error(error.message);

                    res.end(JSON.stringify({ success: false, msg: error.message, callback: "/login" }));
                };
            });
        }).on("error", (error) => {
        console.error(error.message);
        res.end(JSON.stringify({ success: false, msg: error.message, callback: "/login" }));
    });

})

//IMPORTANT : NOT REQUIRED as per current scenario
//Update usertype (method: post, path: /api/update_type, body: usertype & userid as JSON)
//BODY Json Example => { "userId": <googleid>, "userType": <usertype> } 
// Usertype => teacher | student
router.post('/update_type', (req, res) => {
    console.log('/update_type')
    let body = req.body;
    User.updateOne({ googleId: body["userId"] }, { userType: body["userType"] },
        (err, doc) => {
            if (err) {
                console.error(err);
                res.end(JSON.stringify({ success: false, msg: err }));
            } else {
                console.log("Updated document => ", doc);
                res.end(JSON.stringify({ success: true, msg: "Usertype updated" }));
            }
        });
})

//Create classroom (method: post, path: /api/create_classroom, body: userid and other class attributes as JSON)
//Body JSON Example => { "userid": <googleid>, "username": <username>, "userimage": <profileimage>, "name": <classname>, "subject": <subject> }
router.post('/create_classroom', (req, res) => {
    console.log('/create_classroom')
    var id = uuidv4();
    let json = req.body;
    //console.log(json["userid"]);
    //let json = JSON.parse(body);
    const newClass = {
        class_id: id,
        class_name: json["name"],
        class_subject: json["subject"],
        class_teacher: [{ userid: json["userid"], username: json["username"], userimage: json["userimage"] }]
    }
    classcreate = Classroom.create(newClass);
    //adding class to userinfo
    User.updateOne({ googleId: json["userid"] }, { $push: { classes: { class_id: id, class_name: json["name"], class_subject: json["subject"], is_teacher: true } } }, (err, raw) => {
        console.log(raw);
        console.log(err);
    });

    console.log(newClass);
    res.end(JSON.stringify({ success: true, msg: "Class created", classid: id, callback: "/class/" + id, data: (newClass) }));
})

//Get Classroom info (method: get, path:/api/get_classroom/<classid>, body: not required)
router.get('/get_classroom/:id', (req, res) => {
    console.log('/get_classroom/' + req.params.id);
    let id = req.params.id;
    //console.log(id);
    let room = Classroom.findOne({ class_id: id }, (err, doc) => {
        //console.log(err);
        //console.log(doc);
        if (doc)
            res.end(JSON.stringify({ success: true, msg: "Class found", data: doc }));
        else
            res.end(JSON.stringify({ success: false, msg: "Class not found" }));
    });
    //console.log(room);

})

//Join student to classroom (method: post, path:/api/join_classroom, body: student id as google id)
//Body JSON example => { "userid": <googleid>, "username": <username>, "userimage": <profile url> }
router.post('/join_classroom/:id', (req, res) => {
    console.log('/join_classroom/' + req.params.id);
    let id = req.params.id;
    let json = req.body;
    Classroom.findOne({ class_id: id }, (err, doc) => {
        if (doc) {
            var list = doc["class_students"];
            var found = list.find((element) => {
                return element.userid == json["userid"];
            });
            if (found)
                res.end(JSON.stringify({ success: false, msg: "Already in class" }));
            else {
                Classroom.updateOne({ class_id: id }, { $push: { class_students: { userid: json["userid"], username: json["username"], userimage: json["userimage"] } } }, (err, raw) => {
                    console.log(err);
                    //console.log(raw);
                });
                User.updateOne({ googleId: json["userid"] }, { $push: { classes: { class_id: id, class_name: doc["class_name"], class_subject: doc["class_subject"] } } }, (err, doc) => {
                    console.log(err);
                    //console.log(doc);
                });
                //console.log("ok");
                res.end(JSON.stringify({ success: true, msg: "User added to class", callback: "/class/" + id }));
            }
        } else
            res.end(JSON.stringify({ success: false, msg: "Class not found" }));
    });
})

//Join student to classroom via invidecode (method: post, path: /api/join_invitecode, body: student info as json body)
//Body JSON Example => { "userid":<googleid>, "username":<username>, "userimage":<profileurl> } 
router.post('/join_invitecode/:code', (req, res) => {
    console.log("/join_invitecode" + req.params.code);
    let code = req.params.code;
    let json = req.body;
    Classroom.findOne({ class_invitecode: code }, (err, doc) => {
        if (err) {
            console.log(err);
            res.end(JSON.stringify({ success: false, msg: "Error occured " + err }));
        }
        if (doc) {
            var list = doc["class_students"];
            var found = list.find((element) => {
                return element.userid == json["userid"];
            });
            if (found) {
                res.end(JSON.stringify({ success: false, msg: "Student already in class" }));
            } else {

                Classroom.updateOne({ class_invitecode: code }, { $push: { class_students: { userid: json["userid"], username: json["username"], userimage: json["userimage"] } } }, (err, raw) => {
                    console.log(err);
                });
                User.updateOne({ googleId: json["userid"] }, { $push: { classes: { class_id: doc["class_id"], class_name: doc["class_name"], class_subject: doc["class_subject"], is_teacher: false } } }, (err, raw) => {
                    console.log(raw);
                    console.log(err);
                });
                res.end(JSON.stringify({ success: true, msg: "Student added to class", callback: "/class/" + doc["class_id"] }));
            }
        } else
            res.end(JSON.stringify({ success: false, msg: "Class not found" }));
    })
})

//Create test (method: post, path:/api/create_quiz, body- classinfo as json)
//Body JSON Example => {"class_id": <classid>, "data": <complete_test_model>}
// Test model => {"name": <testname>, "startdate": <date&time>, "duration": <time in minutes>, "buffertime": <time-in-minutes>, "questions": <array of question model>}
// Question model => {"question": <question-text>, "options": <array of options model>}
// Option model => {"option": <answer-text>, "is_answer": <true/false>}
router.post('/create_quiz', (req, res) => {
    console.log('/create_quiz');
    let json = req.body;
    let id = uuidv4();
    var question_list = json["data"]["questions"];
    var question_model = new Array();
    question_list.array.forEach(element => {
        var option_list = element["options"];
        var option_model = new Array();
        var answer_model = new Array();
        option_list.array.forEach(element1 => {
            var op_id = (Math.random() * 200000000000).toString(36).split('.')[0];
            option_model.push({ option_id: op_id, option_text: element1.option });
            if (element1.is_answer)
                answer_model.push({ option_id: op_id });
        });
        var question = {
            question_id: (Math.random() * 200000000000).toString(36).split('.')[0],
            question_text: element["question"],
            question_type: (answer_model.length > 1) ? 1 : 0,
            question_options: option_model,
            question_answers: answer_model
        }
        question_model.push(question);
    });
    var quiz_item = {
        quiz_id: id,
        quiz_classid: json["class_id"],
        quiz_name: json["data"]["name"],
        quiz_start_datetime: json["data"]["startdate"],
        quiz_duration: json["data"]["duration"],
        quiz_buffer_time: json["data"]["buffertime"],
        quiz_questions: question_model
    }
    Quiz.create(quiz_item);
    res.end(JSON.stringify({ success: true, msg: "Quiz created", quizid: id, callback: "/quiz/" + id, data: (quiz_item) }));
});

//Get Quiz (method:get, path: /api/get_quiz/<id>, body: not required)
router.get('/get_quiz/:id', (req, res) => {
    let id = req.params.id;
    Quiz.findOne({ quiz_id: id }, (err, doc) => {
        if (doc)
            res.end(JSON.stringify({ success: true, msg: "Quiz found", data: doc }));
        else
            res.end(json.stringify({ success: false, msg: "Quiz not found" }));
    });
});

//Create Post in notice board (method:post, path:/api/create_notice, body: google_id & class_id)
//Body JSON Example => { "userid": <googleid>, "classid": <classid>, "text": <notice text>, "expiry_date": <notice expiry date>, "type": <true/false> }
router.post('/create_notice', (req, res) => {
    let json = req.body;
    console.log(json);
    var classid = json["classid"];
    var userid = json["userid"];
    const newNotice = {
        notice_id: uuidv4(),
        notice_classid: classid,
        notice_userid: userid,
        notice_expiry: json["expiry_date"],
        notice_text: json["text"],
        notice_type: json["type"]
    };

    Notice.create(newNotice);
    res.end(JSON.stringify({ success: true, msg: "Notice created", data: newNotice }));
});

//Get notice of notice board of class (method: get, path:/api/get_notice, body: not required)
router.get('/get_notice/:id', (req, res) => {
    let classid = req.params.id;
    Notice.find({ notice_classid: classid }, (err, doc) => {
        res.end(JSON.stringify({ success: true, data: doc }));
    });
});

//Automated Method for realtime notification[Ignore this]
router.put('/create_notice', (req, res) => {

});

//Create Class feed (method:post, path:/api/create_post, body: google_id & class_id)
//Body JSON Example => { "userid": <googleid>, "classid": <classid>, "text": <post-text> }
router.post('/create_post', (req, res) => {
    let json = req.body;
    let id = uuidv4();
    console.log(json);
    const newFeed = {
        post_id: id,
        post_text: json["text"],
        post_classid: json["classid"],
        post_userid: json["userid"]
    }
    Feed.create(newFeed);
    res.end(JSON.stringify({ success: true, msg: "Feed Created", data: newFeed }));
});

//Create Feed reply (method:post, path:/api/create_post_reply, body: postid, googleid)
//Body JSON Example => { "userid": <googleid>, "postid": <postid>, "text": <post_text> }
router.post('/create_post_reply', (req, res) => {
    let json = req.body;
    console.log(json);
    let id = uuidv4();
    const newFeedReply = {
        post_reply_id: id,
        post_reply_text: json["text"],
        post_reply_userid: json["userid"]
    }
    Feed.updateOne({ post_id: json["postid"] }, { $push: { post_replies: newFeedReply } }, (err, doc) => {
        console.log(err);
        console.log(doc);
    });
    res.end(JSON.stringify({ success: true, msg: "Reply created", data: newFeedReply }));
});

//Get Class feed (method:get, path:/api/get_feeds/<classid>, body: not required)
router.get('/get_feeds/:id', (req, res) => {
    let id = req.params.id;
    Feed.find({ post_classid: id }, (err, doc) => {
        res.end(JSON.stringify({ success: true, msg: "All feeds", data: doc }));
    });
});

//Create Attendance (method:post, path:/api/create_attendance/<classid>, body: date, list of student id)
//JSON Body Example -> { "date" : <date>, "data": [<present student ids>] }
router.post('/create_attendance/:id', async(req, res) => {
    let id = req.params.id;
    let json = req.body;
    let uid = uuidv4();
    let classsheet = await Attendance.findOne({ attend_classid: id }, (err, doc) => {

    });
    if (classsheet) //Already in DB
    {
        const newSheet = {
            attend_id: uid,
            attend_list: json["data"]
        };
        Attendance.updateOne({ attend_classid: id }, { $push: { attend_days: newSheet } });
        res.end(JSON.stringify({ success: true, msg: "Added Sheet" }));
    } else {
        const newClassSheet = {
            attend_classid: id,
            attend_days: [{
                attend_id: uid,
                attend_list: json["data"]
            }]
        }
        Attendance.create(newClassSheet);
        res.end(JSON.stringify({ success: true, msg: "Created Sheet" }));
    }

});

//Get Attendance (method:get, path:/api/get_attendance/<classid>, body: not required)
router.get('/get_attendance/:id', (req, res) => {
    let id = req.params.id;
    Attendance.findOne({ attend_classid: id }, (err, doc) => {
        if (doc)
            res.end(JSON.stringify({ success: true, msg: "Class found", data: doc }));
        else
            res.end(JSON.stringify({ success: false, msg: "Class not found" }));
    });
});

//Get Attendance wrt to student (method:get, path:/api/get_student_attendance/<classid>, body: userid)
//JSON body example - { "userid": <googleid> }
router.get('/get_student_attendance/:id', (req, res) => {
    let id = req.params.id;
    let json = req.body;
    Attendance.findOne({ attend_classid: id }, (err, doc) => {
        if (doc) {
            var student_attendance = new Array();
            var days = doc["attend_days"];
            days.array.forEach(element => {
                var sheet = element["attend_list"];
                var found = sheet.find((element1) => {
                    return element1 == json["userid"];
                });
                if (found)
                    student_attendance.push({ date: element["attend_date"], is_present: true });
                else
                    student_attendance.push({ date: element["attend_date"], is_present: false });
            });
            res.end(JSON.stringify({ success: true, msg: "Student attendance", data: student_attendance }));
        } else
            res.end(JSON.stringify({ success: false, msg: "Class not found" }));
    });
});

//RandomE testing uuid
router.post('/test', (req, res) => {
    console.log((Math.random() * 200000000000).toString(36).split('.')[0]);
    res.end(JSON.stringify({ version1: uuidv1(), version4: uuidv4() }));
})


module.exports = router;