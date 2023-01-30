const imgModel = require('../models/image')
const router = require('express').Router()
const fs = require('fs')
const multer = require('multer');
const path = require('path')


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
});


const upload = multer({ storage: storage });


router.post('/', upload.single('image'), (req, res, next) => {

  // console.log(fs.readFileSync('../uploads/'));
  let obj = {
    name: req.body.name,
    desc: req.body.desc,
    img: {
      data: fs.readFileSync(path.join('uploads/' + req.file.filename)),
      contentType: ['image/png', 'image/jpg', 'image/jpeg', 'image/bmp'],
      url: ('uploads/' + req.file.filename)
    }
  }
  imgModel.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    }
    else {
      // item.save();
      res.json(obj);
    }
  });
});

router.get('/', async (req, res) => {


  const data = await imgModel.find()
  if (data) {
    res.send(data)

  }
  // imgModel.find({}, (err, items) => {
  //   if (err) {
  //     console.log(err);
  //     res.status(500).send('An error occurred', err);
  //   }
  //   else {
  //     res.render('imagesPage', { items: items });
  //   }
  // });
});


module.exports = router;

