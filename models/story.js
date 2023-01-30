const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  img:
  {
    data: Buffer,
    contentType: [String],
    url: String
  },
  name_book: {
    type: String,
    // require: true
  },
  written_by: {
    type: String,
    // require: true
  },
  time_read: {
    type: String,
    // require:true
  },
  age_for: {
    type: String,
    // require: true
  },
  youtube_link: String,
  telegram_link: String,
  short_descr: {
    type: String,
    // require: true
  },
  full_descr: {
    type: String,
    // require: true
  }
});

//Story is a model which has a schema storySchema

const Story = new mongoose.model('Story', storySchema);


module.exports = Story