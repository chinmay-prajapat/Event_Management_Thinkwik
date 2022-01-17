const mongoose = require("mongoose");

mongoose.connect(
  //   "mongodb+srv://chinmay:chinmay@cluster0.1mw3a.mongodb.net/EventManagement?retryWrites=true&w=majority",
  "mongodb://127.0.0.1:27017/event-management",
  { useNewUrlParser: true }
);
