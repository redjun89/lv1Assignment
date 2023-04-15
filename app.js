// Express 초기화 및 미들웨어 등록

const express = require("express");
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const db = mongoose.connection;
const app = express();
//express 모듈을 불러와서 애플리케이션 객체 생성

const bodyParser = require("body-parser");
const morgan = require("morgan");
//body-parser를 사용하여 POST 요청으로 전송된 JSON 데이터 파싱

const routes = require("./routes");

mongoose.connect('mongodb://localhost:27017/myapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});


db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});
//mongoose를 이용해 MongoDB와 연결


app.use(bodyParser.json());
app.use(morgan("tiny"));

app.use("/", routes);

app.listen(port, () => {
    console.log(`${port} 포트로 서버가 열렸습니다.`);
  });
  //환경 변수에 따라 포트 번호를 설정하고,
  // app.listen() 함수를 이용해서 해당 포트 번호로 HTTP 요청을 받아들일 수 있도록 함