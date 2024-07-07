const express = require("express");
const { getRooms, getRoom } = require("../controllers/rooms.js");
const router = express.Router();

router.get("/", getRooms); // gets all rooms
router.post("/:id", getRoom); // gets a specific room

module.exports = router;
