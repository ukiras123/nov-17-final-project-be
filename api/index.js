/* eslint-disable no-unused-vars */
const express = require('express');
require('dotenv').config();
const cors = require('cors');
// eslint-disable-next-line import/no-extraneous-dependencies
const morgan = require('morgan');
const { userRouter } = require('./router/user');
const { message: { ERROR } } = require('./utils/const');
const dbConnect = require('./config/mongoConfig');
const { categoryRouter } = require('./router/category');
const { auth } = require('./middleware/authMiddleware');
const { productRouter } = require('./router/product');

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

app.use('/api/v1/admin', userRouter);
// category
app.use('/api/v1/category', auth, categoryRouter);
app.use('/api/v1/product', auth, productRouter);

// CRUD
// JOI Validation
// Auth Middleware

// Product
// paymentOption

// app.use((req, res, _next) => {
//   console.log('I am ABC');
//   _next();
// });

// app.use((req, res, _next) => {
//   console.log('I am DCF');
//   _next(new Error('Errro'));
// });

// app.use((err, req, res, _next) => {
//   console.log('I am ERROR');
//   res.status(500).json({
//     status: ERROR,
//     message: err.message,
//   });
// });

app.use((err, req, res, _next) => {
  console.log('I am ERROR2');
  const code = err?.statusCode || 500;
  res.status(code).json({
    status: ERROR,
    message: err.message,
  });
});

dbConnect.then(() => {
  console.log('DB Connected successfully');
  app.listen(PORT, (error) => (error
    ? console.log(error)
    : console.log(`Server is running at http://localhost:${PORT}`)));
}).catch((e) => {
  console.log('Error', e);
});
