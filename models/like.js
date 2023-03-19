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
		require: false
	}
});

const Like = new mongoose.model('Like', likeSchema);

module.exports = Like
exports.likeSchema = likeSchema