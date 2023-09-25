const express = require("express");
const app = express();
require("dotenv").config();
//Port and Routers
const port = process.env.PORT;
const userRouter = require("./routers/userRouter");





//Handle Body Parsed from Requrest
app.use(express.json());

////////////////
let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
  }
  app.use(allowCrossDomain);

// Allow CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/user", userRouter);

app.use((error, req, res, next) => {
  res.status(404).json(error.message);
});

app.listen(port, () => {
  console.log("Server is ready on PORT => ", +port);
});
