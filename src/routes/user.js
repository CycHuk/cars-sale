const express = require('express')
const router = express.Router()

const authMiddleware = require('../middlewares/auth')

const { getUser, changePassword, getUserCars } = require('../controllers/user')

router.get('/', authMiddleware, getUser)
router.post('/changePassword', authMiddleware, changePassword)
router.get('/getCars', authMiddleware, getUserCars)

module.exports = router
