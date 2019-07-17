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
const bodyParser = require("body-parser");
const csv = require("./server/models/csv");
const Backup = require("./server/models/Backup");
const addCsv = require("./server/helper/addCsv");
const backupCsv = require("./server/helper/backupCsv");
const deleteCsv = require("./server/helper/deleteCsv");
const postCsv = require("./server/helper/postCsv");

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

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(bodyParser.json());

  server.get("/api", async (req, res) => {
    getInitData().then(data => res.send(data));
  });

  server.post("/update", (req, res) => {
    postCsv(req.body, csv, res);
  });

  server.post("/backup", (req, res) => {
    Backup.deleteMany({}, err => {
      if (err) console.log(err);
      backupCsv(req.body, Backup, res);
    });
  });

  server.post("/delete", (req, res) => {
    deleteCsv(req.body, csv, res);
  });

  server.post("/addTask", (req, res) => {
    addCsv(req.body, csv, res);
  });

  server.get("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`Ready on http://localhost:${port}`);
  });
});
