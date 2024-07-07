const Rooms = require("../models/rooms.js");

module.exports.getRooms = async (req, res) => {
  try {
    // retieve all posts we have in the data base
    const rooms = await Rooms.find();

    res.status(200).json(rooms);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports.getRoom = async (req, res) => {
  const { id } = req.params;
  const url = id;
  try {
    const room = await Rooms.findOne({ url });
    res.status(200).json(room);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
