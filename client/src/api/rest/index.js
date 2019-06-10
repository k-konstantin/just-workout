import axios from 'axios'
import jwt from 'jsonwebtoken'

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
        .then(response => {
            const { exp, iat, email, displayName } = jwt.decode(response.data)
            return {
                token: response.data,
                expiredAt: Date.now() + (exp - iat) * 1000,
                email,
                displayName,
            }
        })
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