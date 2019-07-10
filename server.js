require("dotenv").config();
const express = require("express");
const next = require("next");
const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const getInitData = require("./server/getInitData");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser')

const uri =
  "mongodb://" +
  process.env.USER +
  ":" +
  process.env.PASS +
  "@ds113019.mlab.com:13019/team-plan";

const uriCurr = `mongodb://${process.env.USER_CURRENT}:${
  process.env.PASS_CURRENT
}@ds261644.mlab.com:61644/team-plan-current`;

mongoose.connect(uriCurr, { useNewUrlParser: true });
const db = mongoose.connection;

// const app = express();
// app.use(cors());
// app.use(express.static("public"));
// app.use(
//   bodyParser.urlencoded({
//     extended: true
//   })
// );
// app.use(bodyParser.json());

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  server.get("/api", (req, res) => {
    res.send({ data: "Hello from Express" });
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`Ready on http://localhost:${port}`);
  });
});
