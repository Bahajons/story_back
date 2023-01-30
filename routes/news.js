const express = require('express');
const router = express.Router()
const _ = require('lodash')
const { News, validateNews } = require('../models/news')
const auth = require('../middleware/auth')



router.get('/', async (req, res) => {

  const id = req.body.id
  if (id) {
    const new_one = await News.findById({ _id: id })
    return res.send(new_one)
  }
  const news = await News.find()
  res.send(news)
})

router.delete('/', async (req, res) => {

  const id = req.body.id;

  if (id) {
    const del_news = await News.findByIdAndRemove({ _id: id })
    res.send(del_news)
  }
  res.send('You did not give id')
})




router.post('/', auth, async (req, res) => {
  const { error } = validateNews(req.body)
  if (error) {
    return res.send('You should send data')
  }

  let news = new News(_.pick(req.body, ['head_title', 'title', 'descr']))

  news = await news.save();

  res.status(201).send("Data added")
})

module.exports = router;