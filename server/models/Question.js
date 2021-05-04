const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  answerA: {
    type: String,
  },
  correctA: {
    type: Boolean,
  },
  answerB: {
    type: String,
  },
  correctB: {
    type: Boolean,
  },
  answerC: {
    type: String,
  },
  correctC: {
    type: Boolean,
  },
  answerD: {
    type: String,
  },
  correctD: {
    type: Boolean,
  },
});

const Question = mongoose.model('Question', QuestionSchema);
module.exports = Question;
