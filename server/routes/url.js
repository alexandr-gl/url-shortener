var express = require('express');
var router = express.Router();
const https = require('https');

const url =
  "https://maps.googleapis.com/maps/api/geocode/json?address=Florence";

router.post('/', function(req, res, next) {
    console.log('>>>!!!<<<', req.body);
    let formatURL = req.body.url;
    if(formatURL.indexOf('http') === -1) {
      formatURL = 'https://' + formatURL;
      console.log('>>>CHECK<<<', formatURL)
    }
    https.get(formatURL, res => {
      res.setEncoding("utf8");
      let body = "";
      res.on("data", data => {
        body += data;
      });
      res.on("end", () => {
        //body = JSON.parse(body);
        console.log('>>> BODY', res.statusCode, res.statusMessage);
      });
    });
});

module.exports = router;
