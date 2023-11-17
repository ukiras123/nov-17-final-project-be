/* eslint-disable no-unused-vars */
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');
const { authRouter } = require('./router/auth');
const { message: { ERROR } } = require('./utils/const');

const app = express();

const PORT = process.env.PORT || 3000;

// Basic Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Server is live',
  });
});

app.use('/api/v1/auth', authRouter);

app.use((err, req, res, _next) => {
  res.status(500).json({
    status: ERROR,
    message: err.message,
  });
});

app.listen(PORT, (error) => (error
  ? console.log(error)
  : console.log(`Server is running at http://localhost:${PORT}`)));
