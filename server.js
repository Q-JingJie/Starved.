// Proxy Server
const express = require("express");
const path = require("path");
const app = express();
const fetch = require("node-fetch");
const port = process.env.PORT || 8080;
require("dotenv").config();

// food category id
const food = "4d4b7105d754a06374d81259";

app.use(express.static(path.resolve(__dirname, "client/build")));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
});

app.use(express.json());

app.use("/Results", async (req, res) => {
  var error = false;
  var queries = [];
  queries.push(req.query.lat);
  queries.push(req.query.long);
  queries.push(req.query.rad);

  // Check validity
  queries.forEach((val) => {
    if (isNaN(val)) {
      error = true;
    }
  });

  if (!error) {
    if (Number(queries[0]) > 90 || Number(queries[0]) < -90) {
      error = true;
    }

    if (Number(queries[1]) > 180 || Number(queries[1]) < -180) {
      error = true;
    }

    if (Number(queries[2]) > 1000 || Number(queries[3]) < 50) {
      error = true;
    }

    if (!error) {
      let lat = queries[0];
      let long = queries[1];
      let rad = queries[2];
      const client_id = process.env.CLIENT_ID;
      const client_secret = process.env.CLIENT_SECRET;
      const api_url = `https://api.foursquare.com/v2/venues/search?ll=${lat},${long}&intent=browse&radius=${rad}&categoryId=${food}&client_id=${client_id}&client_secret=${client_secret}&v=20200521`;
      const fetch_res = await fetch(api_url);
      const json = await fetch_res.json();
      res.json(json);
    } else {
      res.json({});
    }
  }
});

app.listen(port);
