const express = require('express');
const Joi = require('joi');
const router = express.Router()
const mongoose = require('mongoose')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const { Users, validateUsers } = require('../models/user');



router.post('/', async (req, res) => {
    const { error, success } = validateUsers(req.body);
    console.log(req.body);
    if (error)
        return res.status(400).send(error.details);

    let username = await Users.findOne({ username: req.body.username })
    if (username) {
        return res.status(400).send('Username allaqachon foydalanilgan')
    }
    let checkemail = await Users.findOne({ email: req.body.email })
    if (checkemail) {
        return res.status(400).send('Email allaqachon foydalanilgan')
    }

    let user = new Users(_.pick(req.body, ['name', 'surname', 'username', 'email', 'password']))
    const salt = await bcrypt.genSalt()
    user.password = await bcrypt.hash(user.password, salt)

    user = await user.save();
    // res.status(201).send(_.pick(user, ['_id', 'name', 'email']))
    res.status(201).send("User created")
})










module.exports = router;