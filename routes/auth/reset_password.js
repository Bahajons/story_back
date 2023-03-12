const { Users } = require("../../models/user");
const sendEmail = require("../util/sentEmail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const express = require("express");
const { config } = require("process");
const router = express.Router();

router.post("/", async (req, res) => {
  const { email } = req.body
  try {
    const schema = Joi.object({ email: Joi.string().email().required() });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await Users.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).send("user with given email doesn't exist");

    const resetPassword = crypto.randomBytes(32).toString("hex")
    await Users.updateOne(
      { email },
      { $set: { resetPassword } });

    const message = `${config.get('front_host')}/reset_password/${user._id}/${resetPassword}`;
    await sendEmail(user.email, "Password reset", message);

    res.send("password reset link sent to your email account");
  } catch (error) {
    res.send("An error occured");
    console.log(error);
  }
});

router.post("/:id/:resetPassword", async (req, res) => {
  const { id, resetPassword } = req.params
  const { password } = req.body;

  try {
    const schema = Joi.object({ password: Joi.string().required() });
    const { error } = schema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    const user = await Users.findById({ id });

    if (!user) return res.status(400).send("invalid link or expired");

    const reset_password = await Users.findOne({
      _id: id,
      resetPassword,
    });

    if (!reset_password) return res.status(400).send("Invalid link or expired");

    const salt = await bcrypt.genSalt()
    const new_password = await bcrypt.hash(password, salt)
    await Users.findOneAndUpdate(
      { _id: id },
      { $set: { password: new_password, resetPassword: null } })

    res.send("password reset sucessfully.");
  } catch (error) {
    res.send(error);
    console.log(error);
  }
});



module.exports = router;