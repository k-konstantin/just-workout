import jwt from 'jsonwebtoken'

import actions from 'constants/actions'

const initialState = {
	token: null,
	expiredAt: null,
	displayName: null,
	email: null,
	isAuthenticated: false,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.LOGIN_SUCCESS: {
			const { token } = action.payload
			const { email, displayName, exp, iat } = jwt.decode(token)
			return {
				...state,
				token,
				email,
				displayName,
				isAuthenticated: true,
				expiredAt: Date.now() + (exp - iat) * 1000,
			}
		}

		case actions.LOGOUT: {
			return { ...initialState }
		}

		default: {
			return state
		}
	}
}

export default reducer