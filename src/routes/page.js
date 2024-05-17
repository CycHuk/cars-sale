const express = require('express')
const router = express.Router()

const authMiddleware = require('../middlewares/auth')

router.get('/', async (req, res) => {
	res.render('index')
})
router.get('/register', async (req, res) => {
	res.render('register')
})

router.get('/login', async (req, res) => {
	res.render('login')
})
router.get('/profile', authMiddleware, async (req, res) => {
	res.render('profile')
})
router.get('/addCar', authMiddleware, async (req, res) => {
	res.render('addCar')
})

module.exports = router
