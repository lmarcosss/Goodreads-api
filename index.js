const axios = require("axios");
const convert = require("xml-js");
const express = require("express");

const app = express();
const key = "YOUR_KEY_HERE";
const url = "https://www.goodreads.com/search/index.xml"; 

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
