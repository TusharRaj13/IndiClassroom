const mongoose = require('mongoose');

const MiniClassroom = new mongoose.Schema({
    class_id: {
        type: String,
        required: true
    },
    class_name: {
        type: String,
        required: true,
        default: ""
    },
    class_subject: {
        type: String,
        required: true
    },
    is_teacher: {
        type: Boolean,
        required: true,
        default: false
    }
});

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String
    },
    classes: [ MiniClassroom ],
    //userType - none, student, teacher
    userType: {
        type: String,
        required: true,
        default: "none"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);