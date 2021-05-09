const mongoose = require('mongoose');
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

const StartedQuizSchema = new Schema(
  {
    quiz: {
      type: mongoose.Schema.Types.ObjectId,
    },
    pin: {
      type: String,
    },
  },
  { timestamps: true }
);
StartedQuizSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });

const Quiz = mongoose.model('Quiz', QuizSchema);
const StartedQuiz = mongoose.model('StartedQuiz', StartedQuizSchema);

module.exports = {
  Quiz,
  StartedQuiz,
};
