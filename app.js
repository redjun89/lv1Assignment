const express = require("express");
const cookieParser = require("cookie-parser");
const routes = require("./routes/index.js");
const connect = require("./schemas");
const app = express();
const port = 3000;
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", routes);

app.listen(port, () => {
    console.log(`${port} 포트로 서버가 열렸습니다.`);
  });
  //환경 변수에 따라 포트 번호를 설정하고,
  // app.listen() 함수를 이용해서 해당 포트 번호로 HTTP 요청을 받아들일 수 있도록 함