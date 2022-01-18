const express = require("express");
const router = new express.Router();
const User = require("../models/user");

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});

    res.json(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/user/:id", async (req, res) => {
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

router.patch("/user/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["firstName", "lastName", "DOB", "gender", "password"];
  const isValidOperation = updates.every((updates) =>
    allowedUpdates.includes(updates)
  );
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }

  try {
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });

    const user = await User.findById(req.params.id);

    updates.forEach((update) => (user[update] = req.body[update]));

    if (!user) {
      return res.status(404).send("No user found");
    }
    await user.save();

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/user/:id", async (req, res) => {
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

module.exports = router;
