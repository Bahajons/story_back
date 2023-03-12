const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  img: {
    type: String
  },
  name_book: {
    type: String,
  },
  written_by: {
    type: String,
  },
  time_read: {
    type: String,
  },
  age_for: {
    type: String,
  },
  youtube_link: String,
  telegram_link: String,
  short_descr: {
    type: String,
  },
  full_descr: {
    type: String,
  }
});

//Story is a model which has a schema storySchema

const Story = new mongoose.model('Story', storySchema);


module.exports = Story