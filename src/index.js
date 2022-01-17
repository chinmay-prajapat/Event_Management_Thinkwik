const express = require("express");
require("./db/mongoose");
const User = require("./models/user");
const Event = require("./models/event");
const res = require("express/lib/response");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});

    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/events", async (req, res) => {
  const event = new Event(req.body);

  try {
    await event.save();

    res.status(201).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/events", async (req, res) => {
  try {
    const events = await Event.find({});

    res.status(200).json(events);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/event/:id", async (req, res) => {
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

app.delete("/event/:id", async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
