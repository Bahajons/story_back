const router = require('express').Router()
const auth = require('../../middleware/auth');
const Story = require('../../models/story');


// ========get all======
router.get('/', async (req, res) => {
	const { id } = req.body

	if (!id) return res.status(400).send('You should send id')

	Story.findById(id, (err, doc) => {
		if (err) {
			return res.status(400).send(err)
		} else {
			return res.send(doc)
		}
	}).select('reacts -_id ')
});
// ======getone====
router.get('/one', async (req, res) => {

});




// ====post=====
router.post('/', auth, async (req, res, next) => {

});



// ===============put========
router.put('/:id', async (req, res, next) => {
	const { id } = req.params

	const update = { img: 'dsadsad' }



	Story.findOneAndUpdate({ _id: id }, update, (err, doc) => {
		if (err) {
			return res.status(400).send(err)
		}
		else {
			return res.status(200).send(doc)
		}
	})



})

// =======delete========
router.delete('/:id', async (req, res,) => {

})


module.exports = router;