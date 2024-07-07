const mongoose = require("mongoose");
const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const bookingRoutes = require("./routes/bookings.js");
const roomRoutes = require("./routes/rooms.js");
const authRoutes = require("./routes/auth.js");

const app = express();
dotenv.config();

// app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "30mb" }));
app.use(cors());

app.use("/rooms", roomRoutes);
app.use("/bookings", bookingRoutes);
app.use("/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Hello to Resort API...");
});
const PORT = process.env.PORT || 6000;

mongoose
  .connect('mongodb+srv://allenanto:antony007@cluster0.furpkyk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() =>{console.log("CONNECTED TO DB")})
  .catch((err) => console.log(err.message,err));

  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });