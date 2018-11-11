//https://tylermcginnis.com/react-router-server-rendering/
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { renderToString } from "react-dom/server";
import React from "react";
import App from "../shared/App";
import serialize from "serialize-javascript";
import mongoose from "mongoose";
import { flushToHTML } from "styled-jsx/server";
import { StaticRouter, matchPath } from "react-router-dom";
import routes from "../shared/routes";
import getInitData from "../shared/getInitData";
import csv from "./models/csv";
import Backup from './models/backup';
import postCsv from './helper/postCsv';
import backupCsv from './helper/backupCsv';

const app = express();
const port = process.env.PORT;

const uri =
  "mongodb://" +
  process.env.USER +
  ":" +
  process.env.PASS +
  "@ds113019.mlab.com:13019/team-plan";
mongoose.connect(uri, { useNewUrlParser: true });
const db = mongoose.connection;

app.use(cors());
app.use(express.static("public"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());

app.get("/api", (req, res) => {
  getInitData().then(doc => res.send(doc));
});

app.post("/update", (req, res) => {
  postCsv(req.body, csv);
});

app.post("/backup", (req, res) => {
  backupCsv(req.body, Backup);
})

app.get("*", (req, res, next) => {
  const activeRoute = routes.find(route => matchPath(req.url, route)) || {};

  const promise = activeRoute.getInitialData
    ? activeRoute.getInitialData()
    : Promise.resolve();

  promise
    .then(data => {
      const context = { data };

      const markup = renderToString(
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      );
      const styles = flushToHTML();

      res.send(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Team Plan</title>
              <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
              <link rel="icon" href="/favicon.ico">
              <script src="/bundle.js" defer></script>
              <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
              <style>
                body {
                width: 95vw;
                height: 95vh;
                font-family: 'Quicksand', sans-serif;
              }

              #svg {
                display: block;
                margin: auto;
                font-family: 'Quicksand', sans-serif;
                padding-top: 5px;
              }
              </style>
              ${styles}
            </head>

            <body>
              <div id="root">${markup}</div>
            </body>
          </html>
        `);
    })
    .catch(next);
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
