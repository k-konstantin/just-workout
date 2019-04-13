import axios from 'axios'

const host = process.env.NODE_ENV === 'development' ? 'http://localhost:4000/' : '/'

axios.defaults.baseURL = host

export const createUser = values =>
	axios.post('/api/users', values)
		.then(response => response)
		.catch(err => {
			let errors = err.response && err.response.data && err.response.data.errors
			if (!errors) {
				errors = { _error: 'Internal server error' }
			} else {
				errors._error = 'Одно или несколько полей заполнены неверно.'
			}

			return { errors }
		})

export const loginUser = values =>
	axios.post('/api/users/login', values)
		.then(response => response)
		.catch(err => {
			let errors
			if (err.response && err.response.status === 500) {
				errors = { _error: 'Internal server error' }
			} else {
				const { message, email, password } = err.response.data
				errors = {
					_error: message ? message : 'Одно или несколько полей не заполнены.',
					email,
					password,
				}
			}

			return { errors }
		})

export default {
	createUser,
	loginUser,
}