import axios from 'axios'
import mongoose from 'mongoose'
import _ from 'lodash'

import initConnectors from 'connectors'
import User from 'routes/users/models/user'
import app from 'app'
import config from 'config'
import ERRORS from 'constants/errors'

const {port} = config
const host = `http://localhost:${port}`

describe('api/users', () => {
    let server

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



    describe('POST /', () => {
        let users

        beforeEach(() => {
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
        })

        it('should create a user', async () => {
            const response = await axios.post('/', users[0])

            expect(response.status).toBe(200)

            const user = await User.findOne({ email: users[0].email})

            expect(user).toMatchObject(_.pick(users[0], User.publicFields))
        })

        describe('should not create a user', () => {
            it('if email already exist', async () => {
                try {
                    users[1].email = users[0].email
                    await axios.post('/', users[1])
                    expect(false).toBe(true)
                } catch(err) {
                    if (err.response) {
                        expect(err.response.status).toBe(400)
                        expect(err.response.data.errors).toEqual({
                            email: ERRORS.REG.EMAIL_EXIST
                        })

                        const user = await User.findOne({ displayName: users[1].displayName})
                        expect(user).toBe(null)
                    } else {
                        throw err
                    }
                }
            })

            it('if email is not valid', async () => {
                try {
                    users[1].email = 'not valid email'
                    await axios.post('/', users[1])
                    expect(false).toBe(true)
                } catch(err) {
                    if (err.response) {
                        expect(err.response.status).toBe(400)
                        expect(err.response.data.errors).toEqual({
                            email: ERRORS.REG.EMAIL_NOT_VALID
                        })

                        const user = await User.findOne({ email: users[1].email})
                        expect(user).toBe(null)
                    } else {
                        throw err
                    }
                }
            })

            it('if no email', async () => {
                try {
                    delete users[1].email
                    await axios.post('/', users[1])
                    expect(false).toBe(true)
                } catch(err) {
                    if (err.response) {
                        expect(err.response.status).toBe(400)
                        expect(err.response.data.errors).toEqual({
                            email: ERRORS.REG.EMAIL_IS_REQUIRED
                        })

                        const user = await User.findOne({ displayName: users[1].displayName})
                        expect(user).toBe(null)
                    } else {
                        throw err
                    }
                }
            })

            it('if no displayName', async () => {
                try {
                    delete users[1].displayName
                    await axios.post('/', users[1])
                    expect(false).toBe(true)
                } catch(err) {
                    if (err.response) {
                        expect(err.response.status).toBe(400)
                        expect(err.response.data.errors).toEqual({
                            displayName: ERRORS.REG.DISPLAY_NAME_IS_REQUIRED
                        })

                        const user = await User.findOne({ email: users[1].email})
                        expect(user).toBe(null)
                    } else {
                        throw err
                    }
                }
            })

            it('if no password', async () => {
                try {
                    delete  users[1].password
                    await axios.post('/', users[1])
                    expect(false).toBe(true)
                } catch(err) {
                    if (err.response) {
                        expect(err.response.status).toBe(400)
                        expect(err.response.data.errors).toEqual({
                            password: ERRORS.REG.PASSWORD_TOO_SHORT
                        })

                        const user = await User.findOne({ email: users[1].email})
                        expect(user).toBe(null)
                    } else {
                        throw err
                    }
                }
            })

            it('if password less than 4 characters', async () => {
                try {
                    users[1].password = 'abc'
                    await axios.post('/', users[1])
                    expect(false).toBe(true)
                } catch(err) {
                    if (err.response) {
                        expect(err.response.status).toBe(400)
                        expect(err.response.data.errors).toEqual({
                            password: ERRORS.REG.PASSWORD_TOO_SHORT
                        })

                        const user = await User.findOne({ email: users[1].email})
                        expect(user).toBe(null)
                    } else {
                        throw err
                    }
                }
            })

            it('if no data', async () => {
                try {
                    await axios.post('/')
                    expect(false).toBe(true)
                } catch(err) {
                    if (err.response) {
                        expect(err.response.status).toBe(400)
                        expect(err.response.data.errors).toEqual({
                            password: ERRORS.REG.PASSWORD_TOO_SHORT,
                            email: ERRORS.REG.EMAIL_IS_REQUIRED,
                            displayName: ERRORS.REG.DISPLAY_NAME_IS_REQUIRED,
                        })

                    } else {
                        throw err
                    }
                }
            })
        })


    })
})