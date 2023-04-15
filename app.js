// Express 초기화 및 미들웨어 등록

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const morgan = require("morgan");

const routes = require("./routes");

app.use(bodyParser.json());
app.use(morgan("tiny"));

app.use("/", routes);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
