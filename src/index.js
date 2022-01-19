const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/user");
const eventRouter = require("./routers/event");

const app = express();
const PORT = process.env.PORT || 5000;

/*  -------- To stop all the transcation ---------*/

// app.use((req, res, next) => {
//   res.status(503).send("Site is currently down. check back soon");
// });

/* --------To stop transcation of specific method or methods-------*/

// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.status(405).send("The service is disabled temporarily");
//   } else {
//     next();
//   }
// });

app.use(express.json());
app.use(userRouter);
app.use(eventRouter);

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
