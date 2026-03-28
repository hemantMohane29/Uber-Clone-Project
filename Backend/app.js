const dotenv = require('dotenv')
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();   // IMPORTANT LINE
const connectToDb = require('./db/db')
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
// const authRoutes = require('./routes/auth.routes');
// const errorHandler = require('./middlewares/error.middleware');

connectToDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use('/user', userRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use('/users', userRoutes);

module.exports = app;