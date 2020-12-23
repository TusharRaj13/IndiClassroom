const mongoose = require('mongoose');

const ClassAttendanceSchema = new mongoose.Schema({
    attend_id: {
        type: String,
        required: true
    },
    attend_date : {
        type: Date,
        required: true,
        default: Date.now()
    },
    attend_list : [{
        type: String,
        required: true
    }]
});

const AttendanceSchema = new mongoose.Schema({
    attend_classid: {
        type: String,
        required: true
    },
    attend_days: [ ClassAttendanceSchema ]
});

module.exports =mongoose.model("Attendance", AttendanceSchema);