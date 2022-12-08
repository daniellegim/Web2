require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');

// Controllers

const products = require('./api/routes/products');
const orders = require('./api/routes/orders');


// App
const app = express();
const server = http.createServer(app);

// Middlewares
app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) => {
    console.log('connected to db seucssfuly');
    server.listen(process.env.PORT || 5000, () => {
      console.log(`Server listining on port ${server.address().port}`);
    })
  }).catch((err) => console.log(err));

app.use('/products', products);
app.use('/orders', orders);
