const mongoose = require('mongoose');

const MiniUser = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    userimage: {
        type: String,
        required: true
    }
});

const ClassroomSchema = new mongoose.Schema({
    class_id: {
        type: String,
        required: true
    },
    class_name: {
        type: String,
        required: true
    },
    class_subject: {
        type: String
    },
    class_invitecode: {
        type: String,
        required: true,
        default: (Math.random()*200000000000).toString(36).split('.')[0]
    },
    //user googleid, name & profileimage in class students & class teacher
    class_teacher: [ MiniUser ],
    class_students: [ MiniUser ],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Classroom", ClassroomSchema)