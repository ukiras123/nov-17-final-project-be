const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;

// Basic Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Server is live',
  });
});

app.listen(PORT, (error) => (error
  ? console.log(error)
  : console.log(`Server is running at http://localhost:${PORT}`)));
