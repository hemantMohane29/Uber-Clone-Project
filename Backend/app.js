const dotenv = require('dotenv')
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();   // IMPORTANT LINE
const connectToDb = require('./db/db')
const userRoutes = require('./routes/user.routes');
// const authRoutes = require('./routes/auth.routes');
// const errorHandler = require('./middlewares/error.middleware');

connectToDb();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoutes);

app.get("/users", (req, res) => {
  res.send("Server is running");
});

app.use((err, req, res, next) => {
  if (err.status === 400 && err.type === 'entity.parse.failed') {
    return res.status(400).json({
      message: 'Invalid JSON in request body',
      hint: 'Use double quotes for every key and string value. Do not use single quotes, trailing commas, or comments.',
      detail: err.message,
    });
  }
  next(err);
});

module.exports = app;