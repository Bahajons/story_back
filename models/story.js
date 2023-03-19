const mongoose = require('mongoose');

const like = new mongoose.Schema({
  count_like: {
    type: Number,
    default: 0
  },
  count_dislike: {
    type: Number,
    default: 0
  },
  liked: {
    type: Boolean,
    default: false
  },
  disliked: {
    type: Boolean,
    default: false
  },
  deviceId: {
    type: [String],
    default: [],
    unique: true
  }
});


const storySchema = new mongoose.Schema({
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  img: {
    type: String,
    default: null
  },
  name_book: {
    type: String,
    default: null
  },
  written_by: {
    type: String,
    default: null
  },
  time_read: {
    type: String,
    default: null
  },
  age_for: {
    type: String,
    default: null
  },
  youtube_link: {
    type: String,
    default: null
  },
  telegram_link: {
    type: String,
    default: null
  },
  short_descr: {
    type: String,
    default: null
  },
  full_descr: {
    type: String,
    default: null
  },
  reactId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: 'Like',
    require: true
  }
});



const Story = new mongoose.model('Story', storySchema);


module.exports = Story