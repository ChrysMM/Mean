const express = require('express');
const helloRoutes = require('./routes/helloworld.route');
const productRoutes = require('./routes/product.route');
const categoryRoutes = require('./routes/category.route')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const port = 4000; // port d'écoute pour le serveur
const mongoose = require('mongoose');
const { Router } = require('express');
mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true,
useFindAndModify: false }).then(
    () => console.log('db connected'),
    err => console.error(`db error ${err}`)
);
app.use(bodyParser.json());
app.use(cors());
app.use('/', helloRoutes);
app.use('/product', productRoutes);
app.use('/category', categoryRoutes)
const server = app.listen(port, () => { console.log('serveur lancé sur le port ' + port) });