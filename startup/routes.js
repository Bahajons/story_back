const user = require('../routes/user')
const login = require('../routes/login')
const profile = require('../routes/profile')
const news = require('../routes/news')
const image = require('../routes/image')
const story = require('../routes/story')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors_middle = require('../middleware/cors_middle')


module.exports = function (app) {
    app.use(express.urlencoded({ extended: true }))
    app.use(cors_middle)
    // app.use(function (req, res, next) {
    //     res.header('Access-Control-Allow-Origin', '*')
    //     res.header('Access-Control-Allow-Headers', 'Authorization, Origin,token, X-Requested-With, Content-Type, Accept')
    //     next()
    // })

    app.use('/api/register', user)
    app.use('/api/login', login)
    app.use('/api/profile', profile)
    app.use('/api/news', news)
    app.use('/api/image', image)
    app.use('/api/story', story)
    app.use('/api/image', express.static('uploads'))
    app.use('/api/story', express.static('uploads'))
    
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json())
    app.use(express.json());
    mongoose.set('strictQuery', false);
}