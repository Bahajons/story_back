const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function auth(req, res, next) {
	let token = req.headers.authorization
	if (!token)
		return res.status(401).send('There is not token. You should give it.')

	token = token.split(' ')[1];
	try {
		const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
		req.user = decoded;
		next();
	} catch (error) {
		return res.status(400).send('Token is not available')
	}
}
