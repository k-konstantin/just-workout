import axios from 'axios'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

import initConnectors from 'connectors'
import User from 'routes/users/models/user'
import app from 'app'
import config from 'config'

const {port} = config
const host = `http://localhost:${port}`

describe('POST /users/login', () => {
	let server
	let users

	beforeAll(done => {
		axios.defaults.baseURL = host + '/api/users'
		axios.defaults.maxContentLength = 1024 * 1024 * 100

		initConnectors()
			.then(() => mongoose.connection.dropDatabase())
			// без этого unique в схеме не работает, так как не успевают создаться индексы
			.then(() => User.init())
			.then(() => {
				server = app.listen(port, () => {
					console.log(`Server is listen on port ${port}`)
					done()
				})
			})
	})

	afterAll(done => {
		server.close(() => {
			mongoose
				.disconnect()
				.then(() => {
					done()
				})
		})
	})

	beforeEach(done => {
		users = [
			{
				email: 'vasya@mail.ru',
				displayName: 'vasya',
				password: 'vasya',
			},
			{
				email: 'petya@mail.ru',
				displayName: 'petya',
				password: 'petya',
			}
		]

		User.deleteMany({}, err => {
			if (err) throw err

			done()
		})
	})

	it('should return 200 and token', async () => {
		await axios.post('/', users[0])

		let user = await User.findOne({ email: users[0].email })

		await axios.get(`/confirm/${user.confirmToken}`)

		const response = await axios.post('/login', { email: users[0].email, password: users[0].password })
		expect(response.status).toBe(200)

		const jwtPaylod = jwt.verify(response.data, config.jwtSecret)
		expect(jwtPaylod).toMatchObject({ email: users[0].email, displayName: users[0].displayName })
	})

	describe('should return 401', () => {
		let user
		beforeEach(async () => {
			await axios.post('/', users[0])

			user = await User.findOne({ email: users[0].email })
		})

		it('if passport is omitted with passport default message', async () => {
			await axios.get(`/confirm/${user.confirmToken}`)

			try {
				await axios.post('/login', { email: users[0].email })
				expect(false).toBe(true)
			} catch(err) {
				if (err.response) {
					expect(err.response.status).toBe(401)
				} else {
					throw err
				}
			}
		})

		it('if email is omitted with passport default message', async () => {
			await axios.get(`/confirm/${user.confirmToken}`)

			try {
				await axios.post('/login', { password: users[0].password })
				expect(false).toBe(true)
			} catch(err) {
				if (err.response) {
					expect(err.response.status).toBe(401)
				} else {
					throw err
				}
			}
		})

		it('if email not found with custom message', async () => {
			await axios.get(`/confirm/${user.confirmToken}`)

			try {
				await axios.post('/login', { email: users[1].email, password: users[0].password })
				expect(false).toBe(true)
			} catch(err) {
				if (err.response) {
					expect(err.response.status).toBe(401)
				} else {
					throw err
				}
			}
		})

		it('if password mismatch with custom message', async () => {
			await axios.get(`/confirm/${user.confirmToken}`)

			try {
				await axios.post('/login', { email: users[0].email, password: users[1].password })
				expect(false).toBe(true)
			} catch(err) {
				if (err.response) {
					expect(err.response.status).toBe(401)
				} else {
					throw err
				}
			}
		})

		it('if user not confirmed  with custom message', async () => {
			try {
				await axios.post('/login', { email: users[0].email, password: users[0].password })
				expect(false).toBe(true)
			} catch(err) {
				if (err.response) {
					expect(err.response.status).toBe(401)
				} else {
					throw err
				}
			}
		})
	})

})