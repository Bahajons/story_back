const express = require('express');
const Joi = require('joi');
const router = express.Router()
const mongoose = require('mongoose')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const { Users, validateUsers } = require('../models/user');
const { Token } = require('../models/token');
const sendEmail = require('./util/sentEmail')


// router.post('/', async (req, res) => {
//     const { error, success } = validateUsers(req.body);
//     console.log(req.body);
//     if (error)
//         return res.status(400).send(error.details);

//     let username = await Users.findOne({ username: req.body.username })
//     if (username) {
//         return res.status(400).send('Username allaqachon foydalanilgan')
//     }
//     let checkemail = await Users.findOne({ email: req.body.email })
//     if (checkemail) {
//         return res.status(400).send('Email allaqachon foydalanilgan')
//     }

//     let user = new Users(_.pick(req.body, ['name', 'surname', 'username', 'email', 'password']))
//     const salt = await bcrypt.genSalt()
//     user.password = await bcrypt.hash(user.password, salt)

//     user = await user.save();
//     // res.status(201).send(_.pick(user, ['_id', 'name', 'email']))
//     res.status(201).send("User created")
// })


router.post("/", async (req, res) => {
    console.log(req.body);
    try {
        // const { error } = validate(req.body);
        if (false) return res.status(400).send(error.details[0].message);

        let user = await Users.findOne({ email: req.body.email });
        if (user)
            return res.status(400).send("User with given email already exist!");

        const salt = await bcrypt.genSalt()
        const password = await bcrypt.hash(req.body.password, salt)
        await new Users({
            name: req.body.name,
            surname: req.body.surname,
            username: req.body.username,
            password: password,
            email: req.body.email,
        }).save()

        let token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();

        const message = `${req.headers.host}}/user/verify/${user.id}/${token.token}`;
        await sendEmail(user.email, "Verify Email", message);

        res.send("An Email sent to your account please verify");
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/verify/:id/:token", async (req, res) => {
    try {
        const user = await Users.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send("Invalid link");

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });
        if (!token) return res.status(400).send("Invalid link");

        await User.updateOne({ _id: user._id, verified: true });
        await Token.findByIdAndRemove(token._id);

        res.send("email verified sucessfully");
    } catch (error) {
        res.status(400).send("An error occured");
    }
});







module.exports = router;