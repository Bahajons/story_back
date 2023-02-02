const imgModel = require('../models/image')
const Story = require('../models/story')
const router = require('express').Router()
const fs = require('fs')
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');


// ========get all======
router.get('/', async (req, res) => {
  const data = await Story.find()
  if (data) {
    res.json(data)
  }
});
// ======getone====
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

// ====post=====
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
  const story_result = await story.save()
  res.send(story_result)

});



const update_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

function delete_image(name) {
  filePath = `uploads/${name}`;
  if (filePath) {
    fs.unlinkSync(filePath);
  }
}

const update_upload = multer({ storage: update_storage });
// ===============put========
router.put('/', auth, update_upload.single('image'), async (req, res, next) => {

  const id = req.body._id
  console.log(req.body);

  if (!id) {
    res.send('There is not id')
  }
  else {
    const story = await Story.findOne({ _id: id })
    if (!story) {
      res.send('Id is not available')
    }

    if (req.file) {
      const story_one = await Story.findById({ _id: id })
      delete_image(story_one?.img?.url?.split('/')[2])
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
    else {
      let obj = {
        img: {
          url: `api/story/${req.body.url}`
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
  }
})


// =======delete========
router.delete('/:id', auth, async (req, res,) => {

  const id = req.params.id
  if (id) {
    const story_one = await Story.findById({ _id: id })
    delete_image(story_one?.img?.url?.split('/')[2])

    const story = await Story.findByIdAndRemove({ _id: id })
    res.send(story)
  }
})

module.exports = router;