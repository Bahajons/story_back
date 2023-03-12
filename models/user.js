const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const config = require('config')

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		default: null
	},
	surname: {
		type: String,
		required: true,
		minlength: 3,
		default: null
	},
	username: {
		type: String,
		required: true,
		minlength: 3,
		unique: true,
		default: null
	},
	email: {
		type: String,
		required: true,
		minlength: 3,
		unique: true,
		default: null
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		unique: true,
		default: null
	},
	verify: {
		type: Boolean,
		required: false,
		default: false,
	},
	verificationToken: {
		type: String,
		default: null
	},
	resetPassword: {
		type: String,
		default: null
	}
})

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id, username: this.username }, config.get('jwtPrivateKey'))
	return token
}
const Users = mongoose.model('Users', userSchema)


function validateUsers(user) {

	let schema = Joi.object({
		name: Joi.string().min(3).max(15).required(),
		surname: Joi.string().min(3).required(),
		username: Joi.string().min(3).max(15),
		email: Joi.string().min(3).max(35).required(),
		password: Joi.string().min(5).required(),
	})
	return schema.validate(user);
}



exports.Users = Users
exports.validateUsers = validateUsers