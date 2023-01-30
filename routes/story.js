const imgModel = require('../models/image')
const Story = require('../models/story')
const router = require('express').Router()
const fs = require('fs')
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');



router.get('/', async (req, res) => {
  const data = await Story.find()
  if (data) {
    res.json(data)
  }
});

router.get('/one/:id', async (req, res) => {

  const id = req.params.id
  if (id) {
    const new_one = await Story.findById({ _id: id })
    return res.send(new_one)
  }
  res.send('You should give id')
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

router.post('/', auth, upload.single('image'), async (req, res, next) => {

  console.log(req)

  let obj = {
    img: {
      data: fs.readFileSync(path.join('uploads/' + req.file.filename)),
      contentType: ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp'],
      url: ('api/story/' + req.file.filename)
    },
    name_book: req.body.name_book,
    written_by: req.body.written_by,
    age_for: req.body.age_for,
    time_read: req.body.time_read,
    youtube_link: req.body.youtube_link,
    telegram_link: req.body.telegram_link,
    short_descr: req.body.short_descr,
    full_descr: req.body.full_descr
  }
  const story = new Story(obj)
  const stor = await story.save()
  res.send(obj)

});


router.put('/', upload.single('image'), async (req, res, next) => {

  const id = req.body._id

  if (!id) {
    res.send('There is not id')
  }
  else {
    const story = await Story.findOne(req.body._id)
    if (!story) {
      res.send('Id is not available')
    }
    let obj = {
      img: {
        data: fs.readFileSync(path.join('uploads/' + req.file.filename)),
        contentType: ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp'],
        url: ('api/story/' + req.file.filename)
      },
      name_book: req.body.name_book,
      written_by: req.body.written_by,
      age_for: req.body.age_for,
      time_read: req.body.time_read,
      youtube_link: req.body.youtube_link,
      telegram_link: req.body.telegram_link,
      short_descr: req.body.short_descr,
      full_descr: req.body.full_descr
    }
    const story_updated = await Story.findByIdAndUpdate(req.body._id, obj)
    res.send(story_updated)
  }
})



router.delete('/:id', async (req, res,) => {

  const id = req.params.id
  if (id) {
    const story = await Story.findByIdAndRemove({ _id: id })
    res.send(story)
  }



})



module.exports = router;

