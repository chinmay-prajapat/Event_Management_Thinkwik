const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const eventRouter = require("./routers/event");
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(userRouter);
app.use(eventRouter);

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
const bcrypt = require("bcryptjs");

const myFunction = async () => {
  const password = "Red12345!";
  const hashedPassword = await bcrypt.hash(password, 8);
  console.log(password);
  console.log(hashedPassword);
  const isMatch = await bcrypt.compare("Red12345!", hashedPassword);
  console.log(isMatch);
};
myFunction();
