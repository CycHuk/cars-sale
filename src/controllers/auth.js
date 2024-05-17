const { prisma } = require('../prisma/prisma-client')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const login = async (req, res) => {
	try {
		const { phoneNumber, password } = req.body
		if (!phoneNumber || !password) {
			return res.status(400).json({ message: 'Заполните обязательные поля' })
		}

		const user = await prisma.User.findFirst({
			where: {
				phoneNumber,
			},
		})

		const isPasswordCorrect =
			user && (await bcrypt.compare(password, user.password))
		const secret = process.env.JWT_SECRET

		if (user && isPasswordCorrect && secret) {
			const token = jwt.sign({ id: user.id }, secret, { expiresIn: '30m' })

			res.cookie('token', token, {
				httpOnly: true,
			})

			return res.status(200).json({ message: 'Успешная авторизация' })
		} else {
			return res
				.status(400)
				.json({ message: 'Неверно введен логин или пароль' })
		}
	} catch {
		return res.status(400).json({ message: 'Что-то пошло не так' })
	}
}

const register = async (req, res) => {
	try {
		const { phoneNumber, password, name } = req.body

		if (!phoneNumber || !password || !name) {
			return res.status(400).json({ message: 'Заполните обязательные поля' })
		}

		const registeredUser = await prisma.User.findFirst({
			where: {
				phoneNumber,
			},
		})

		if (registeredUser) {
			return res.status(400).json({ message: 'Номер уже зарегистрирован' })
		}

		const salt = await bcrypt.genSalt(10)
		const hashedPassword = await bcrypt.hash(password, salt)

		const user = await prisma.user.create({
			data: {
				name,
				phoneNumber,
				password: hashedPassword,
			},
		})

		if (user) {
			const secret = process.env.JWT_SECRET
			const token = jwt.sign({ id: user.id }, secret, { expiresIn: '30m' })

			res.cookie('token', token, {
				httpOnly: true,
			})

			return res.status(200).json({ message: 'Успешная регистрация' })
		} else {
			return res
				.status(400)
				.json({ message: 'Не удалось создать пользователя' })
		}
	} catch (error) {
		return res.status(400).json({ message: 'Что-то пошло не так' })
	}
}

const logout = (req, res) => {
	res.clearCookie('token')
	res.redirect('/login')
}

module.exports = {
	login,
	register,
	logout,
}
