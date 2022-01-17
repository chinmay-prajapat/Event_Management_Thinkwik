const express = require("express");
const router = express.Router();
const Event = require("../models/event");

router.post("/events", async (req, res) => {
  const event = new Event(req.body);

  try {
    await event.save();

    res.status(201).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/events", async (req, res) => {
  try {
    const events = await Event.find({});

    res.status(200).json(events);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/event/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).send();
    }
    res.status(200).send(event);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete("/event/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const event = await Event.findByIdAndDelete(id);

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
