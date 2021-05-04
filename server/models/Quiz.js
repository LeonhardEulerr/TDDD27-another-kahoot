const mongoose = require('mongoose');
const Question = require('./Question');
const { Schema } = mongoose;

const QuizSchema = new Schema({
  user: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
});

// QuizSchema.pre('remove', function (next) {
//   console.log('lala');
//   for (const qId of QuizSchema.questions) {
//     Question.findOneAndDelete({ _id: qId }).exec();
//   }
//   next();
// });

const Quiz = mongoose.model('Quiz', QuizSchema);
module.exports = Quiz;
