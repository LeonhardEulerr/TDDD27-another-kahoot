const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { server } = require('./socketServer');

require('dotenv').config();

const PORT = process.env.PORT || 5000;

const AuthRoute = require('./routes/auth');
const QuizRoute = require('./routes/quiz');
const app = express();
const socketServer = server(app);

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

socketServer.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.use('/api', AuthRoute);
app.use('/api', QuizRoute);
