const dotenv = require('dotenv')
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();   // IMPORTANT LINE
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db')
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes')
const mapRoutes = require('./routes/maps.routes')
const rideRoutes = require('./routes/ride.routes')
// const authRoutes = require('./routes/auth.routes');
// const errorHandler = require('./middlewares/error.middleware');

connectToDb();
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use('/user', userRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes)
app.use('/maps', mapRoutes)
app.use('/rides', rideRoutes)
module.exports = app;