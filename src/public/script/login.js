document
	.getElementById('loginForm')
	.addEventListener('submit', async function (event) {
		event.preventDefault()

		const phoneNumber = document.getElementById('phoneNumber').value
		const password = document.getElementById('password').value

		try {
			const response = await fetch('/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ phoneNumber, password }),
			})

			if (response.ok) {
				window.location.href = '/'
			} else {
				const data = await response.json()
				const errorMessageDiv = document.getElementById('errorMessage')
				errorMessageDiv.textContent = data.message
			}
		} catch (error) {
			console.error('Error:', error)
		}
	})

var element = document.getElementById('phoneNumber')
var maskOptions = {
	mask: '+7(000)000-00-00',
	lazy: false,
}
var mask = new IMask(element, maskOptions)
