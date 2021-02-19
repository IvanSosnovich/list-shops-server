const express = require("express");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const { connect, connection } = require("./model/main");
require("dotenv").config();

const app = express();

const userRouter = require("./router/userRouter");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sessionConfig = {
  store: new MongoStore({ mongooseConnection: connection }),
  key: "sid",
  secret: "example",
  resave: true,
  saveUninitialized: false,
  cookie: { expires: 600000 },
};

app.use(session(sessionConfig));

const corsMiddleware = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  next();
};

app.use(corsMiddleware);
app.use("/user", userRouter);

app.listen(process.env.PORT, () => {
  console.log("server start");
  connect(
    process.env.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
    () => {
      console.log("base start");
    },
  );
});
