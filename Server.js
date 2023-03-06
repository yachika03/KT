const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const employeeRoutes = require('./routes/employees');
const assetRoutes = require('./routes/asset');
const assetCategoryRoutes = require('./routes/assetCategory');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Define routes
app.use('/employees', employeeRoutes);
app.use('/assets', assetRoutes);
app.use('/assetCategories', assetCategoryRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/assetTracker', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
