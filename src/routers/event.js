const express = require("express");
const router = express.Router();
const Event = require("../models/event");
const auth = require("../middlewares/auth");

router.post("/events", auth, async (req, res) => {
  const event = new Event({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await event.save();

    res.status(201).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/events/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).send("No event found!");
    }

    const id = req.user._id;
    event.participants.addToSet(id);

    await event.save();

    res.status(201).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/leftEvents/:id", auth, async (req, res) => {
  try {
    const events = await Event.findById(req.params.id);

    if (!events) {
      return res.status(404).send("No event found!");
    }

    const id = req.user._id;

    events.participants = events.participants.filter(
      (i) => i._id.toString() !== id.toString()
    );

    await events.save();

    res.status(201).send(events);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/events", auth, async (req, res) => {
  try {
    const events = await Event.find({ owner: req.user._id });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/event/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const event = await Event.findOne({ _id, owner: req.user._id });
    if (!event) {
      return res.status(404).send();
    }
    res.status(200).send(event);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/event/:id", auth, async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findOneAndDelete({
      _id: id,
      owner: req.user._id,
    });

    if (!event) {
      return res.status(404).send();
    }
    const totalDoc = await Event.countDocuments();
    res.json(totalDoc);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
