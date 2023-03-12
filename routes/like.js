const router = require('express').Router()
const auth = require('../middleware/auth');


// ========get all======
router.get('/', async (req, res) => {
    const data = await Like.find()
    if (data) {
        return res.send(data)
    }
});
// ======getone====
router.get('/one', async (req, res) => {

});




// ====post=====
router.post('/', auth, async (req, res, next) => {

});



// ===============put========
router.put('/:id', async (req, res, next) => {

})

// =======delete========
router.delete('/:id', async (req, res,) => {

})


module.exports = router;