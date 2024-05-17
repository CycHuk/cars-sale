document.addEventListener('DOMContentLoaded', () => {
	const brandIdSelect = document.getElementById('brandId')

	fetch('/cars/categories')
		.then(response => response.json())
		.then(data => {
			const filteredData = data.filter(item => item.id !== 0)

			filteredData.forEach(category => {
				const option = document.createElement('option')
				option.value = category.id
				option.textContent = category.name
				brandIdSelect.appendChild(option)
			})
		})
		.catch(error => {
			console.error('Error fetching categories:', error)
		})
})

document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('addCarsForm')

	form.addEventListener('submit', async e => {
		e.preventDefault()

		const brandId = form.brandId.value
		const name = form.name.value
		const year = form.year.value
		const price = form.price.value
		const description = form.description.value

		const carData = { brandId, name, year, price, description }

		try {
			const response = await fetch('/cars/add', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(carData),
			})

			if (!response.ok) {
				throw new Error('Failed to add car')
			}

			const data = await response.json()
			const carId = data.id

			const formData = new FormData()

			formData.append('carId', carId)

			const files = document.getElementById('photos').files
			for (let i = 0; i < files.length; i++) {
				formData.append('photos', files[i])
			}

			const responsePhotos = await fetch('/cars/addPhotos', {
				method: 'POST',
				body: formData,
			})

			if (responsePhotos.ok) {
				window.location.href = '/'
			} else {
				const data = await response.json()
				const errorMessageDiv = document.getElementById('errorMessage')
				errorMessageDiv.textContent = data.message
			}
		} catch (error) {
			console.error('Error adding car:', error.message)
		}
	})
})
