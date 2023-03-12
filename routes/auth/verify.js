const express = require('express');
const router = express.Router()
const { Users } = require('../../models/user');
const sendEmail = require('../util/sentEmail');
const config = require('config')

router.get("/:id/:token", async (req, res) => {
    console.log(req.params);
    const { id, token } = req.params
    try {
        const user_id = await Users.findOne({ _id: id });
        if (!user_id) return res.status(400).send("Invalid link");

        const user_token = await Users.findOne({
            verificationToken: token
        });
        if (!user_token) return res.status(400).send("Invalid link");

        await Users.updateOne(
            { _id: user_token._id },
            { $set: { verify: true, verificationToken: null } });

        res.send("Email verified sucessfully");
    } catch (error) {
        console.log(error);
        res.status(400).send("An error occured");
    }
});

router.get("/", async (req, res) => {
    const { email } = req.body
    if (!email) res.status(400).send('Email is required')

    const user = await Users.findOne({ email });
    if (!user) res.status(401).send('Email is not registered')

    if (user.verify) res.status(400).send('User already verified')

    const message = `${config.get('front_host')}/user/verify/${user.id}/${user.verificationToken}`;
    const sent = await sendEmail(user.email, "Verify Email", message);
    console.log(sent);
    res.send("An email sent to your account, please verify");
});


module.exports = router;