const mongoose = require('mongoose');

const PostReplySchema = new mongoose.Schema({
    post_reply_id: {
        type: String,
        required: false
    },
    post_reply_text: {
        type: String,
        required: false
    },
    post_reply_created: {
        type: Date,
        required: false,
        default: Date.now()
    },
    post_reply_userid: {
        type: String,
        required: false
    }
});

const PostSchema = new mongoose.Schema({
    post_id: {
        type: String,
        required: true
    },
    post_text: {
        type: String,
        required: true
    },
    post_created: {
        type: Date,
        required: true,
        default: Date.now()
    },
    post_classid: {
        type: String,
        required: true
    },
    post_userid: {
        type: String,
        required: true
    },
    post_replies: [PostReplySchema]
});




module.exports = mongoose.model("Feed", PostSchema);
//module.exports = mongoose.model("FeedReply", PostReplySchema);