import axios from 'axios'

const host = process.env.NODE_ENV === 'development' ? 'http://localhost:4000/' : '/'

axios.defaults.baseURL = host

export const createUser = values =>
	axios.post('/api/users', values)
		.then(response => {
			return response
		})
		.catch(err => {
			let errors = err.response && err.response.data && err.response.data.errors
			if (!errors) {
				errors = { _error: 'Internal server error' }
			}

			return { errors }
		})

export default {
	createUser,
}