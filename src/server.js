const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productRoutes = require('./routes/product.routes');
const proposalRoutes = require('./routes/proposal.routes');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/proposals', proposalRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(process.env.PORT || 3000);
    console.log("Server is online");
  })
  .catch((err) => {
    console.error(err);
  });