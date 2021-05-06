const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const AuthRoute = require('./routes/auth');
const QuizRoute = require('./routes/quiz');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully!');
});

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.use('/api', AuthRoute);
app.use('/api', QuizRoute);
