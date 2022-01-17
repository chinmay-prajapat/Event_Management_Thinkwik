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
