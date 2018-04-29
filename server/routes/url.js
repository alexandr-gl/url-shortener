var express = require('express')
var router = express.Router()
var config = require('../../project.config')
var api = require('./api.js')
var models = require('../models/urlmodel')
const https = require('https')
var url = require("url")
var request = require('request');

router.get('/urls', function (req, res) {
  console.log('>>> WE ARE GETTING LINKS', req.params);
  return models.Url.find(function (err, result) {
    if(err || !result) {
      return res.send({error: 'Urls wasnt got'});
    }
    else {
      res.send(result);
    }
  })
});

router.post('/url', function(req, res) {
  let formatURL = url.parse(req.body.url).href
  console.log('000')
  if (req.body.shortUrl === null && req.body.save !== true) {
    var shortURL;
    request(formatURL, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var newUrl = models.Url({
          long_url: formatURL
        })
        newUrl.save(function (err) {
          if (err) {
            console.log(err)
          }
          // make short url
          let index = models.Url.find({long_url: formatURL}, function (err, result) {
            if (err) {
              console.log(err)
            }
            else {
              shortURL = config.config.webhost + api.encode(newUrl.index)
              res.send({'shortURL': shortURL})
            }
          })
        })
      }
    })
}
else {
    models.Url.find({short_url: req.body.shortUrl}, function(err, result){
      if(req.body.shortUrl === null) {
        res.send('Save success')
        console.log('111')
        return
      }
      if(result.length !== 0) {
        res.send('Link is busy')
        console.log('222')
      }
      if(result.length === 0) {
        models.Url.findOneAndUpdate({long_url: formatURL}, {$set: {short_url: req.body.shortUrl}}, function (err, result) {
          if (err) {res.send('Error. Can\'t change shorten url')}
          else {
            // res.send(result)
            res.send('Save success')
          }
        })
      }
    })
  }
});

router.get('/:short_link', function (req, res, next) {
  console.log('>>> SHORT LINK', req.params)
  if(req.params.short_link.indexOf('.') === -1) {
    var base58Id = req.params.short_link;
    var id = api.decode(base58Id);

    // check if url already exists in database
    models.Url.findOneAndUpdate({index: id}, {$inc: {clicks: 1}}, function (err, doc) {
      if (doc) {
        // found an entry in the DB, redirect the user to their destination
        res.redirect(doc.long_url);
      }
    });
  }
  else {
    next();
  }
});

module.exports = router
