var express = require('express')
var router = express.Router()
var config = require('../../project.config')
var api = require('./api.js')
var models = require('../models/urlmodel')
const https = require('https')
var url = require("url")
var request = require('request');

router.post('/', function(req, res, next) {
  var shortURL;
  let formatURL = url.parse(req.body.url).href
  request(formatURL, function (error, response, body) {
    console.log('response.statusCode', response.statusCode)
    if (!error && response.statusCode == 200) {
      var newUrl = models.Url({
        long_url: formatURL
      })
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
            shortURL =  config.config.webhost + api.encode(newUrl.index)
            res.send({'shortURL' : shortURL})
          }
        })
      })
    }
  })
});

module.exports = router
