const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuizSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
});

const Quiz = mongoose.model('Quiz', QuizSchema);
module.exports = Quiz;
