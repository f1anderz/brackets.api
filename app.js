const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const userRoutes = require('./api/routes/user');

mongoose.connect(
  `mongodb+srv://f1anderz:${process.env.MONGO_ATLAS_PW}@f1anderz.oxags.mongodb.net/?retryWrites=true&w=majority&appName=f1anderz/brackets`
);

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', userRoutes);

app.use((err, res) => {
  res.status(err.status || 500).json({
    error: {
      status: false,
      message: err.message
    }
  });
});

module.exports = app;
