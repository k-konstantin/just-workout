import jwt from 'jsonwebtoken'

import actions from 'constants/actions'
import localApi from 'api/local'

const loadedToken = localApi.getToken()

const initialState = {
	token: loadedToken && loadedToken.token,
	expiredAt: loadedToken && loadedToken.expiredAt,
	displayName: null,
	email: null,
	isAuthenticated: false,
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actions.LOGIN_SUCCESS: {
			const { token, expiredAt, email, displayName } = action.payload
			return {
				...state,
				token,
				email,
				displayName,
				isAuthenticated: true,
				expiredAt,
			}
		}

		case actions.LOGOUT: {
			return {
				...initialState,
				token: null,
				isAuthenticated: null,
			}
		}

		default: {
			return state
		}
	}
}

export default reducer