document.addEventListener('DOMContentLoaded', function () {
	const carBrandsList = document.getElementById('carBrandsList')
	let selectedCategory = null

	function createCarBrandElement(category) {
		const li = document.createElement('li')
		li.setAttribute('data-id', category.id)
		li.textContent = category.name
		li.addEventListener('click', function () {
			if (selectedCategory !== null) {
				selectedCategory.classList.remove('active')
			}
			this.classList.add('active')
			selectedCategory = this
		})
		return li
	}

	function fetchCarCategories() {
		fetch('/cars/categories')
			.then(response => response.json())
			.then(data => {
				data.forEach(category => {
					const carBrandElement = createCarBrandElement(category)
					carBrandsList.appendChild(carBrandElement)
				})
				if (data.length > 0) {
					selectedCategory = carBrandsList.children[0]
					selectedCategory.classList.add('active')
				}
			})
			.catch(error => console.error('Ошибка получения данных:', error))
	}

	fetchCarCategories()
})

document.addEventListener('DOMContentLoaded', function () {
	const carListContainer = document.getElementById('carList')

	function displayCarsByBrand(brandId) {
		carListContainer.innerHTML = ''
		document.getElementById('carListNone').innerHTML = ''

		fetch(`/cars?brandId=${brandId}`)
			.then(response => response.json())
			.then(data => {
				if (data.length === 0) {
					const noCarsMessage = document.createElement('p')
					noCarsMessage.textContent =
						'Извините, автомобилей данной марки временно нет.'

					document.getElementById('carListNone').appendChild(noCarsMessage)
				} else {
					data.forEach(car => {
						const carItem = createCarItem(car)
						carListContainer.appendChild(carItem)
					})
				}
			})
			.catch(error => console.error('Ошибка получения данных:', error))
	}

	function createCarItem(car) {
		const carItem = document.createElement('div')
		carItem.classList.add('car-item')

		const imageWrapper = document.createElement('div')
		imageWrapper.classList.add('image-wrapper')

		if (car.photos.length > 1) {
			const swiperContainer = document.createElement('div')
			swiperContainer.classList.add('swiper-container')

			const swiperWrapper = document.createElement('div')
			swiperWrapper.classList.add('swiper-wrapper')

			car.photos.forEach((photo, index) => {
				const swiperSlide = document.createElement('div')
				swiperSlide.classList.add('swiper-slide')

				const image = document.createElement('img')
				image.src = photo
				image.alt = car.name

				swiperSlide.appendChild(image)
				swiperWrapper.appendChild(swiperSlide)
			})

			swiperContainer.appendChild(swiperWrapper)
			imageWrapper.appendChild(swiperContainer)

			const swiper = new Swiper(swiperContainer, {
				loop: true,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
			})

			const paginationContainer = document.createElement('div')
			paginationContainer.classList.add('swiper-pagination')
			imageWrapper.appendChild(paginationContainer)

			swiper.params.pagination.el = paginationContainer
			swiper.pagination.destroy()
			swiper.pagination.init()
			swiper.pagination.update()
		} else {
			const image = document.createElement('img')
			image.src = car.photos.length > 0 ? car.photos[0] : '/image/default.jpg'
			image.alt = car.name
			imageWrapper.appendChild(image)
		}

		carItem.appendChild(imageWrapper)

		const carDetails = document.createElement('div')
		carDetails.classList.add('car-details')
		carDetails.innerHTML = `
            <h2>${car.name}</h2>
            <p>${car.description}</p>
            <p>Год: ${car.year}</p>
            <p>Цена: ${car.price}</p>
            <p>Продавец: ${car.user.name}</p>
            <p>Телефон: ${car.user.phoneNumber}</p>
        `
		carItem.appendChild(carDetails)

		return carItem
	}

	displayCarsByBrand(0)
	document
		.getElementById('carBrandsList')
		.addEventListener('click', function (event) {
			if (event.target.tagName === 'LI') {
				const brandId = event.target.getAttribute('data-id')
				displayCarsByBrand(brandId)
			}
		})
})
