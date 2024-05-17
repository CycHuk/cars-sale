const { prisma } = require('../prisma/prisma-client')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const getUser = async (req, res) => {
	try {
		const userId = req.user.id
		const user = await prisma.User.findFirst({
			where: {
				id: userId,
			},
			select: {
				name: true,
				phoneNumber: true,
			},
		})
		if (!user) {
			return res.status(404).json({ message: 'Пользователь не найден' })
		}

		const carCount = await prisma.car.count({
			where: {
				userId: userId,
			},
		})

		res.status(200).json({ ...user, carCount })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: 'Что-то пошло не так' })
	}
}

const changePassword = async (req, res) => {
	try {
		const userId = req.user.id
		const { currentPassword, newPassword } = req.body

		const user = await prisma.User.findFirst({
			where: {
				id: userId,
			},
		})
		if (!user) {
			return res.status(404).json({ message: 'Пользователь не найден' })
		}

		const passwordMatch = await bcrypt.compare(currentPassword, user.password)
		if (!passwordMatch) {
			return res.status(400).json({ message: 'Неверный текущий пароль' })
		}

		const hashedNewPassword = await bcrypt.hash(newPassword, 10)
		await prisma.user.update({
			where: {
				id: userId,
			},
			data: {
				password: hashedNewPassword,
			},
		})

		res.status(200).json({ message: 'Пароль успешно изменен' })
	} catch (error) {
		console.error(error)
		return res.status(500).json({ message: 'Что-то пошло не так' })
	}
}

const getUserCars = async (req, res) => {
	try {
		const userId = req.user.id

		let userCarsQuery = {
			select: {
				id: true,
				year: true,
				name: true,
				price: true,
				description: true,
				brand: {
					select: {
						name: true,
					},
				},
				photos: {
					select: {
						url: true,
					},
				},
			},
			where: {
				userId: userId,
			},
		}

		const userCars = await prisma.car.findMany(userCarsQuery)

		const userCarsWithSimpleBrand = userCars.map(car => ({
			...car,
			brand: car.brand.name,
		}))

		const userCarsWithSimplePhotos = userCarsWithSimpleBrand.map(car => ({
			...car,
			photos: car.photos.map(photo => photo.url),
		}))

		res.json(userCarsWithSimplePhotos)
	} catch (error) {
		console.error('Error fetching user cars:', error)
		res.status(500).json({ error: 'Internal server error' })
	}
}

module.exports = {
	getUserCars,
	getUser,
	changePassword,
}
