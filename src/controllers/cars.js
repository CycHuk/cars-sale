const { prisma } = require('../prisma/prisma-client')
const fs = require('fs/promises')

const getCars = async (req, res) => {
	try {
		const { brandId } = req.query

		let carsQuery = {
			select: {
				id: true,
				year: true,
				name: true,
				price: true,
				description: true,
				user: {
					select: {
						name: true,
						phoneNumber: true,
					},
				},
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
		}

		if (brandId && brandId != 0) {
			carsQuery = {
				...carsQuery,
				where: {
					brandId: parseInt(brandId),
				},
			}
		}

		const cars = await prisma.car.findMany(carsQuery)

		const carsWithSimpleBrand = cars.map(car => ({
			...car,
			brand: car.brand.name,
		}))

		const carsWithSimplePhotos = carsWithSimpleBrand.map(car => ({
			...car,
			photos: car.photos.map(photo => photo.url),
		}))

		res.json(carsWithSimplePhotos)
	} catch (error) {
		console.error('Error fetching cars:', error)
		res.status(500).json({ error: 'Internal server error' })
	}
}

const getCategories = async (req, res) => {
	try {
		const categories = await prisma.brand.findMany({
			select: {
				id: true,
				name: true,
			},
			orderBy: {
				id: 'asc',
			},
		})

		const categoriesWithAll = [{ id: 0, name: 'Все' }, ...categories]

		res.json(categoriesWithAll)
	} catch (error) {
		console.error('Error fetching categories:', error)
		res.status(500).json({ error: 'Internal server error' })
	}
}

const addCars = async (req, res) => {
	try {
		const { brandId, name, year, price, description } = req.body
		const userId = req.user.id

		const newCar = await prisma.car.create({
			data: {
				name,
				userId,
				brandId: parseInt(brandId),
				year: parseInt(year),
				price: parseFloat(price),
				description,
			},
		})

		res.status(200).json({ id: newCar.id })
	} catch (error) {
		res.status(500).json({ message: 'Неизвестная ошибка' })
	}
}

const addPhotos = async (req, res) => {
	try {
		const { carId } = req.body
		const files = req.files

		for (const file of files) {
			const photoUrl = `/image/${file.filename}`

			await prisma.photo.create({
				data: {
					carId: parseInt(carId),
					url: photoUrl,
				},
			})
		}

		res.status(200).json({
			message: 'Photos uploaded successfully!',
		})
	} catch (error) {
		res.status(500).json({ message: 'Неизвестная ошибка' })
	}
}

const delCar = async (req, res) => {
	const userId = req.user.id
	const carId = req.body.carId

	try {
		const existingCar = await prisma.car.findFirst({
			where: {
				AND: [{ id: carId }, { userId: userId }],
			},
		})

		if (!existingCar) {
			return res.status(404).json({
				error: 'Машина не найдена или не принадлежит текущему пользователю.',
			})
		}

		const photos = await prisma.photo.findMany({
			where: {
				carId: carId,
			},
		})

		for (const photo of photos) {
			await fs.unlink(`src/public/${photo.url}`)
		}

		await prisma.photo.deleteMany({
			where: {
				carId: carId,
			},
		})

		await prisma.car.delete({
			where: {
				id: carId,
			},
		})

		return res.status(200).json({ message: 'Машина успешно удалена.' })
	} catch (error) {
		console.error('Ошибка при удалении машины:', error)
		return res
			.status(500)
			.json({ error: 'Внутренняя ошибка сервера при удалении машины.' })
	}
}

module.exports = { getCars, getCategories, addCars, addPhotos, delCar }
