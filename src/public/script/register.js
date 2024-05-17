document.addEventListener('DOMContentLoaded', function () {
	const registerForm = document.getElementById('loginForm')
	const errorMessageDiv = document.getElementById('errorMessage')

	registerForm.addEventListener('submit', async function (event) {
		event.preventDefault()

		const name = registerForm.elements['name'].value
		const phoneNumber = registerForm.elements['phoneNumber'].value
		const password = registerForm.elements['password'].value

		const requestBody = {
			name: name,
			phoneNumber: phoneNumber,
			password: password,
		}

		console.log(requestBody)

		try {
			const response = await fetch('/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(requestBody),
			})

			if (response.ok) {
				window.location.href = '/'
			} else {
				const responseData = await response.json()
				errorMessageDiv.textContent = responseData.message
			}
		} catch (error) {
			console.error('Error during registration:', error)
			errorMessageDiv.textContent =
				'Произошла ошибка при регистрации. Пожалуйста, попробуйте еще раз.'
		}
	})
})

var element = document.getElementById('phoneNumber')
var maskOptions = {
	mask: '+7(000)000-00-00',
	lazy: false,
}
var mask = new IMask(element, maskOptions)
