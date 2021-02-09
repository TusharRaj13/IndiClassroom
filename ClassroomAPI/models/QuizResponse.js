const mongoose = require('mongoose');

const ResponseSchema = new mongoose.Schema({
    quiz_id : {
        type: String,
        required: true
    },
    student_id : {
        type: String,
        required: true
    },
    question_resp : [{
        question_id: {
            type:String,
            required:true
        },
        answer_ids: [{
            type: String,
            required:true
        }]
    }],
    quiz_score : {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("QuizResponse", ResponseSchema);