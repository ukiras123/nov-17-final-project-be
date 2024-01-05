const express = require('express');
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(cors());

app.use(express.json())

const connectDB = require("./src/config/mongoDB");
const { clientRouter } = require('./src/router/clientRouter');
const { categoryRouter } = require('./src/router/categoryRouter');
const { productRouter } = require('./src/router/productRouter');
const { reviewRouter } = require('./src/router/reviewRouter');
const { orderRouter } = require('./src/router/orderRouter');

const PORT = process.env.PORT || 3005;

app.use('/api/v1/client', clientRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/review', reviewRouter);
app.use('/api/v1/order', orderRouter)

app.get("/health", (req, res) => {
    res.json({
        status: "health check is done!!",
    })
})

connectDB().then(() => {
    console.log(`successfully connected to the mongoDB`)
    app.listen(PORT, () => {
        console.log(`Server is connect to the http://localhost:${PORT}`)
    })
})
    .catch((error) => {
        console.log(`DB connection error `, error)
    })