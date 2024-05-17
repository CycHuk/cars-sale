function getUserData() {
	fetch('/user/')
		.then(response => response.json())
		.then(data => {
			const userDataDiv = document.getElementById('userData')
			userDataDiv.innerHTML = `
          <h1>Личные данные</h1>
          <p>Имя: ${data.name}</p>
          <p>Номер телефона: ${data.phoneNumber}</p>
          <p>Количество автомобилей: ${data.carCount}</p>
          <button onclick='logout()'>Выйти</button>
        `
		})
		.catch(error =>
			console.error('Ошибка при получении данных пользователя:', error)
		)
}

function changePassword(event) {
	event.preventDefault()
	const currentPassword = document.getElementById('currentPassword').value
	const newPassword = document.getElementById('newPassword').value
	const errorMessageDiv = document.getElementById('errorMessage')
	const messageDiv = document.getElementById('message')

	messageDiv.textContent = ''
	errorMessageDiv.textContent = ''

	fetch('/user/changePassword', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ currentPassword, newPassword }),
	})
		.then(response => {
			if (response.ok) {
				messageDiv.textContent = 'Пароль успешно сменен'
			} else {
				errorMessageDiv.textContent = 'Неверный пароль'
			}
		})
		.catch(error => console.error('Ошибка при смене пароля:', error))
}

function logout() {
	fetch('/auth/logout')
		.then(response => {
			if (response.ok) {
				window.location.href = '/login'
			} else {
				alert('Ошибка при выходе из аккаунта')
			}
		})
		.catch(error => console.error('Ошибка при выходе из аккаунта:', error))
}

window.onload = function () {
	getUserData()
	document
		.getElementById('changePasswordForm')
		.addEventListener('submit', changePassword)
}

document.addEventListener('DOMContentLoaded', function () {
	const carListContainer = document.querySelector('.container-cars')

	function displayUserCars() {
		carListContainer.innerHTML = ''

		fetch('/user/getCars')
			.then(response => response.json())
			.then(data => {
				if (data.length === 0) {
					carListNone.innerHTML = '<p>У вас нет автомобилей.</p>'
				} else {
					carListNone.innerHTML = ''
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
		carItem.setAttribute('data-car-id', car.id)

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
            <p>Описание: ${car.description}</p>
            <p>Год: ${car.year}</p>
            <p>Цена: ${car.price}</p>
        `
		carItem.appendChild(carDetails)

		const deleteButton = document.createElement('button')
		deleteButton.classList.add('delete-button')
		deleteButton.textContent = 'Удалить'
		deleteButton.addEventListener('click', () => {
			deleteCar(car.id)
		})
		carItem.appendChild(deleteButton)

		return carItem
	}

	displayUserCars()

	function deleteCar(carId) {
		Swal.fire({
			title: 'Вы уверены?',
			text: 'Вы хотите удалить эту машину?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Да, удалить!',
			cancelButtonText: 'Отмена',
		}).then(result => {
			if (result.isConfirmed) {
				fetch(`/cars/del`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ carId: carId }),
				})
					.then(response => {
						if (response.ok) {
							displayUserCars()
							getUserData()
						}
					})
					.catch(error => console.error('Ошибка удаления машины:', error))
			}
		})
	}
})
