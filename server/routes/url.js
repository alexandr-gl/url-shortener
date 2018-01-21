var express = require('express')
var router = express.Router()
var config = require('../../project.config')
var api = require('./api.js')
var models = require('../models/urlmodel')
const https = require('https')

router.post('/', function(req, response, next) {
    var shortURL;
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
        if (res.statusCode === 200 || res.statusCode === 302)
        {
          var newUrl = models.Url({
            long_url: formatURL
          })
          //save link
          newUrl.save(function(err){
            if(err){
              console.log(err)
            }
            // make short url
            let index = models.Url.find({long_url: formatURL}, function(err, result){
              if(err) {
                console.log(err)
              }
              else {
                console.log('RESULT', result[0].index, config.config.webhost, api.encode(result[0].index))
                shortURL =  config.config.webhost + api.encode(result[0].index)
                response.send({ 'shortURL': shortURL })
                console.log('SHORT URL111', shortURL)
              }
            })
            console.log('NEW URL', newUrl, index)

            console.log('SHORT URL', shortURL)
          })
        }
      });
    });
});

module.exports = router
