const express = require('express');
const Joi = require('joi');
const router = express.Router()
const { Users } = require('../../models/user');
const auth = require("../../middleware/auth")


router.get('/', auth, async (req, res) => {
  const user = await Users.findById(req.user._id).select('-password')
  return res.send(user)
})

router.put('/', auth, async (req, res) => {
  const { error } = validateUsers(req.body);
  const user = req.body
  if (error)
    return res.status(400).send(error.details);
  try {
    let user_one = await Users.findByIdAndUpdate(
      { _id: user._id },
      user,
      { new: true }
    )
    const date = { user: _.pick(user_one, ['_id', 'name', 'surname', 'email']) }
    
    return res.send(date)
  } catch (error) {
    console.log(error);
    return res.send("Email or username already existed")
  }
})

function validateUsers(user) {

  let schema = Joi.object({
    _id: Joi.string().min(3).max(55).required(),
    name: Joi.string().min(3).max(15).required(),
    surname: Joi.string().min(3).required(),
    username: Joi.string().min(3).max(15).required(),
    email: Joi.string().min(3).max(35).required(),
  })
  return schema.validate(user);
}

module.exports = router;