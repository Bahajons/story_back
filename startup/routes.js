const register = require('../routes/auth/register')
const verify = require('../routes/auth/verify')
const login = require('../routes/auth/login')
const profile = require('../routes/auth/profile')
const like = require('../routes/like')
const story = require('../routes/story')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors_middle = require('../middleware/cors_middle')
const reset_password = require('../routes/auth/reset_password')

module.exports = function (app) {
    app.use(express.urlencoded({ extended: true }))
    app.use(cors_middle)

    app.use(express.json());
    app.use('/api/register', register)
    app.use('/api/login', login)
    app.use('/api/verify', verify)
    app.use('/api/reset', reset_password)
    app.use('/api/profile', profile)

    app.use('/api/story', story)
    app.use('/api/like', like)
    app.use('/api/image', express.static('uploads'))
    app.use('/api/story', express.static('uploads'))

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    mongoose.set('strictQuery', false);
}