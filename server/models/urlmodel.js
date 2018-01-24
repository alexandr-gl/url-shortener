var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var config = require('../../project.config')
var api = require('../routes/api.js')
var CronJob = require('cron').CronJob;

// create the counters schema with an _id field and a seq field
var CounterSchema = new Schema({
  _id: { type: String, default: 'url_count' },
  seq: { type: Number, default: 0 }
});

// create a model from that schema
var counter = mongoose.model('counter', CounterSchema);

// create a schema for our links
var urlSchema = new Schema({
  long_url: String,
  short_url: String,
  index: Number,
  clicks: { type: Number, default: 0 },
  created_at: Date
});

// The pre('save', callback) middleware executes the callback function
// every time before an entry is saved to the urls collection.
urlSchema.pre('save', function(next){
  var doc = this;
  // find the url_count and increment it by 1
  counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1}}, function(error, result) {
    if(result === null)
    {
      counter.create({_id: 'url_count', seq: 1})
      result = {_id: 'url_count', seq: 1}
    }
    if (error)
      return next(error);
    // set the _id of the urls collection to the incremented value of the counter
    doc.index = result.seq
    doc.short_url = config.config.webhost + api.encode(result.seq)
    doc.created_at = new Date()
    var myDate = new Date();

    var dayOfMonth = myDate.getDate();
    myDate.setDate(dayOfMonth + 15);
    var job = new CronJob({
      cronTime: myDate,
      onTick: function() {
        doc.findOneAndRemove({_id: doc._id}, function (){
          console.log('Delete successfull')
        })
      },
      start: false,
      timeZone: 'America/Los_Angeles'
    });
    next()
  })
})


var Url = mongoose.model('Url', urlSchema);

module.exports = {Url, counter};
