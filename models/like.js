const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
	count_like: {
		type: Number,
		default: 0
	},
	count_dislike: {
		type: Number,
		default: 0
	},
	deviceId: {
		type: Array,
		default: null
	}
});

const Like = new mongoose.model('Like', likeSchema);

module.exports = Like