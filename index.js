const axios = require("axios");
const convert = require("xml-js");
const express = require("express");

const app = express();
const key = "KGXBPKnyuYSnSpYDYo7rA";
const url = "https://www.goodreads.com/search/index.xml";

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/book/:isbn", (req, res) => {
  axios.get(`${url}?q=${req.params.isbn}&key=${key}`).then(result => {
    let jsConverted = convert.xml2js(result.data, {
      compact: true,
      spaces: 4
    });
    if (jsConverted.GoodreadsResponse.search.results.work) {
      let avarageRating =
        jsConverted.GoodreadsResponse.search.results.work.average_rating;
      res.send(avarageRating);
    }
  });
});

const server = app.listen(5000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log("Server listening at http://localhost:5000/");
});
