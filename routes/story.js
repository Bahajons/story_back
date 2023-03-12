const Story = require('../models/story')
const router = require('express').Router()
const fs = require('fs')
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const Joi = require('joi');


// ========get all======
router.get('/', async (req, res) => {
  const data = await Story.find()
  if (data) {
    return res.send(data)
  }
});
// ======getone====
router.get('/one/:id', async (req, res) => {

  const id = req.params.id
  if (id) {
    const new_one = await Story.findById({ _id: id })
    return res.send(new_one)
  }
  return res.send('You should give id')
});



// upload image 
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
  const { name_book, written_by, age_for, time_read, youtube_link, telegram_link, short_descr, full_descr } = req.body
  const story = new Story()
  story.name_book = name_book;
  story.written_by = written_by;
  story.age_for = age_for;
  story.time_read = time_read;
  story.youtube_link = youtube_link
  story.telegram_link = telegram_link
  story.short_descr = short_descr
  story.full_descr = full_descr

  if (req.file) {
    story.img = ('api/story/' + req.file.filename)
  }
  await story.save((err, result) => {
    return res.status(201).send(result)
  })

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
  if (name) {
    console.log(name);
    filePath = `uploads/${name}`;
    if (filePath) {
      fs.unlinkSync(filePath);
    }
  }
}

const update_upload = multer({ storage: update_storage });


// ===============put========
router.put('/:id', update_upload.single('image'), async (req, res, next) => {
  const { name_book, written_by, age_for, time_read, youtube_link, telegram_link, short_descr, full_descr } = req.body
  const { id } = req.params
  const filter = { _id: id }; // specify the filter to find the document to update
  let update = req.body; // get the data to update from the request body

  if (req.file) {
    const image = await Story.findById({ _id: id })
    delete_image(image?.img?.split('/')[2])
    update = { ...update, img: `api/story/${req.file.filename}` }
  }
  // set the options to return the updated document and enable validators
  const options = { new: true, runValidators: true };

  Story.findOneAndUpdate(filter, update, options, (err, updateStory) => {
    if (err) {
      return res.status(500).send('Internal server error');
    } else {
      if (!updateStory) {
        res.status(404).send('story not found');
        return;
      }
      return res.send(updateStory);
    }
  });
})

// =======delete========
router.delete('/:id', async (req, res,) => {

  const { id } = req.params
  const { error } = validate(id)
  if (error) return res.send(error)

  if (!id) return res.send('There is not id !')

  if (id) {
    const story_one = await Story.findById({ _id: id })
    if (!story_one) return res.status(400).send('Story did not find with this id !')

    delete_image(story_one?.img?.url?.split('/')[2])
    const story = await Story.findByIdAndRemove({ _id: id })
    return res.send('Story deleted successfully')
  }
})


function validate(id) {

  let schema = Joi.object({
    id: Joi.number().integer().min(3).max(35).required()
  })
  return schema.validate({ id });
}


module.exports = router;