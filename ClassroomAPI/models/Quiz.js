const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
    option_id:{
        type: String,
        required: true
    },
    option_text:{
        type: String,
        required: true
    }
});

const AnswerSchema = new mongoose.Schema({
    option_id:{
        type: String,
        required: true
    }
})

const QuestionSchema = new mongoose.Schema({
    question_id:{
        type: String,
        required: true
    },
    question_text:{
        type: String,
        required: true
    },
    //question_type = Single Choice = 0 , Multiple choice = 1
    question_type:{
        type: number,
        required: true
    },
    question_options:[ OptionSchema ],
    question_answers:[ AnswerSchema ]
});

const QuizSchema = new mongoose.Schema({
    quiz_id:{
        type: String,
        required: true
    },
    quiz_classid:{
        type: String,
        required: true
    },
    quiz_name:{
        type: String,
        required: true
    },
    quiz_start_datetime:{
        type: Date,
        required: true
    },
    quiz_duration:{
        type: Number,
        required: true
    },
    quiz_buffer_time:{
        type: Number,
        required: true,
        default: 0
    },
    quiz_questions:[ QuestionSchema ]
});

module.exports = mongoose.model("Quiz", QuizSchema);