const express = require('express');
require('dotenv').config();
const connectDB = require('../config/db');
const pageRoutes = require('./pageRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const cartRoutes = require("./cartRoutes");
const authRoutes = require('./authRoutes');
const orderRoutes = require('./orderRoutes');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require("express-session");

const app = express();

connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({resave:false, saveUninitialized:false, secret: "my_secret"}));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));



// Serve pages
app.use( pageRoutes);
app.use( dashboardRoutes);
app.use( cartRoutes);
app.use( authRoutes);
app.use( orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
