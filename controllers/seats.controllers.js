const Seats = require('../models/seats.models');
const uniqid = require('uniqid');
sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seats.find());
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getId = async (req, res) => {
  try {
    const seat = await Seats.findById(req.params.id);
    if (!seat) res.status(404).json({ message: 'Not found' });
    else res.json(seat);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const clean = sanitize(req.body);
    const { client, seat, email, day } = clean;
    const newSeat = new Seats({
      id: uniqid(),
      client,
      seat,
      email,
      day,
    });
    await newSeat.save();
    res.json(newSeat);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { day, seat, client, email } = req.body; try {
    const seat = await (Seats.findById(req.params.id));
    if (seat) {
      seat.day = day;
      seat.seat = seat,
        seat.client = client;
      seat.email = email;
      await seat.save();
      res.json(seat);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const seat = await (Seats.findById(req.params.id));
    if (seat) {
      await Seats.deleteOne({ _id: req.params.id });
      res.json(seat);
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};