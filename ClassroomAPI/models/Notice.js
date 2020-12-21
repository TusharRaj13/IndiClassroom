const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
    notice_id: {
        type: String,
        required: true
    },
    notice_text:{
        type: String,
        required: true
    },
    notice_expiry:{
        type: Date,
        required: true
    },
    notice_created:{
        type: Date,
        required: true,
        default: Date.now()
    },
    notice_type:{
        type: Boolean,
        reuired: true,
        default: false
    },
    notice_classid:{
        type: String,
        reuired: true
    },
    notice_userid:{
        type: String,
        required: true
    }
});
module.exports = mongoose.model("Notice", NoticeSchema);