const express = require('express');
const router = express.Router()
const _ = require('lodash')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const { Users } = require('../../models/user');
const sendEmail = require('../util/sentEmail');
const config = require('config')

router.post("/", async (req, res) => {
	console.log(req.headers);
	const { name, surname, username, password, email } = req.body
	let arr = [], t = true
	if (!name) { t = false, arr.push('Name must required') }
	if (!surname) { t = false, arr.push('Surname must required') }
	if (!username) { t = false, arr.push('Username must required') }
	if (!password) { t = false, arr.push('Password must required') }
	if (!email) { t = false, arr.push('Email must required') }
	if (!t) {
		res.status(400).send(arr)
	}
	if (t) {
		try {
			let user_email = await Users.findOne({ email });
			if (user_email)
				return res.status(400).send("This email already used");

			let user_username = await Users.findOne({ username })
			if (user_username)
				return res.status(400).send('This username already used')

			const salt = await bcrypt.genSalt()
			const password1 = await bcrypt.hash(password, salt)
			const verificationToken = crypto.randomBytes(32).toString("hex")
			const user = new Users({
				name,
				surname,
				username,
				password: password1,
				email,
				verificationToken
			})

			user.save(async (err, saved) => {
				if (err) {
					console.log(err);
					return
				}
				console.log('verify token saved');
				const message = `${config.get('front_host')}/user/verify/${user.id}/${verificationToken}`;
				// const message = `${req.headers.host}/user/verify/${user.id}/${verificationToken}`;
				const sent = await sendEmail(user.email, "Verify Email", message);
				console.log(sent);
				res.send("An email sent to your account, please verify");
			})

		} catch (error) {
			res.status(400).send(error);
			console.log(error);
		}
	}
});


module.exports = router;