//https://tylermcginnis.com/react-router-server-rendering/
import express from "express";
import cors from "cors";
import { renderToString } from "react-dom/server";
import App from '../shared/App';
import React from 'react';
import serialize from "serialize-javascript";
import mongoose from 'mongoose';
import { flushToHTML } from 'styled-jsx/server'

import Test from './models/test';
import csv from './models/csv';
import Value from './models/Values';

const app = express();
const port = process.env.PORT;

const uri = 'mongodb://' + process.env.USER + ':' + process.env.PASS + '@ds113019.mlab.com:13019/team-plan';
mongoose.connect(uri, { useNewUrlParser: true });
const db = mongoose.connection;

// We're going to serve up the public
// folder since that's where our
// client bundle.js file will end up.
app.use(express.static("public"))

app.get("*", (req, res, next) => {

  Value.find().select().exec((err, values) => {
    if(err) console.err;
    csv.find().select().exec((err, doc) => {
      if(err) console.err;
      const data = {csv: doc, values: values};
      const markup = renderToString(
      <App data={data}/>
      );
      const styles = flushToHTML();
      res.send(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Team Plan</title>
              <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
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
              <script src="/bundle.js" defer></script>
              <script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
            </body>
          </html>
        `)

      })
    })
});

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`)
})