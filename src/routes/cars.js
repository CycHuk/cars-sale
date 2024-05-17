const express = require('express')
const router = express.Router()
const multer = require('multer')

const authMiddleware = require('../middlewares/auth')

const {
	getCars,
	getCategories,
	addCars,
	addPhotos,
	delCar,
} = require('../controllers/cars')

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'src/public/image')
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`)
	},
})

const upload = multer({ storage: storage })

router.get('/', getCars)
router.get('/categories', getCategories)
router.post('/add', authMiddleware, addCars)
router.post('/del', authMiddleware, delCar)
router.post('/addPhotos', authMiddleware, upload.array('photos', 12), addPhotos)

module.exports = router
