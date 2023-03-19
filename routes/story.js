const Story = require('../models/story')
const router = require('express').Router()
const fs = require('fs')
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const Joi = require('joi');


// ========get all for users======
router.get('/', async (req, res) => {
  const data = await Story
    .find()
    .populate('authorId', '_id name surname username email')
    .populate('reactId')
    .select()

  if (data) {
    return res.send(data)
  }
});
// ========get limit======
router.get('/:limit', async (req, res) => {
  const { limit } = req.params
  const data = await Story
    .find()
    .populate('authorId', '_id name surname username')
    .select().limit(limit ? limit : 10)

  if (data) {
    return res.send(data)
  }
});



// ======get detail one====
router.get('/detail/:id', async (req, res) => {

  const { id } = req.params

  if (id) {
    const detail = await Story
      .findById({ _id: id })
      .populate('authorId', 'name surname username')
      .select()
    return res.send(detail)
  }
  return res.send('You should give id')
});


// ======get authosr's stories ====
router.get('/by_author/:id/:limit', async (req, res) => {

  const { id, limit } = req.params

  if (id) {
    const detail = await Story
      .find({ authorId: id })
      .populate('authorId', '-_id name surname username')
      .select().limit(limit ? limit : 10)
    return res.send(detail)
  }
  return res.send('You should give id')
});

router.get('/by_author/:id/', async (req, res) => {

  const { id } = req.params

  if (id) {
    const detail = await Story
      .find({ authorId: id })
      .populate('authorId', '-_id name surname username')
      .select()
    return res.send(detail)
  }
  return res.send('You should give id')
});

function validate(id) {

  let schema = Joi.object({
    id: Joi.number().integer().min(3).max(35).required()
  })
  return schema.validate({ id });
}


module.exports = router;