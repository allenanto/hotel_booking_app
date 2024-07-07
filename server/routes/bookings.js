const express = require("express");
const {
  getBooking,
  getAllBookings,
  postBooking,
  getAllAvailable,
  deleteBooking,
} = require("../controllers/bookings.js");

const router = express.Router();

router.get("/", getAllBookings);
router.post("/", getBooking);
router.post("/delete", deleteBooking);
router.post("/create", postBooking);
router.post("/available", getAllAvailable);

module.exports = router;
