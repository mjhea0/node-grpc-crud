// requirements
const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/productRoutes');

// express
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes
app.use('/api', productRoutes);

// run server
app.listen(3000, () => {
  console.log('Server listing on port 3000');
});
