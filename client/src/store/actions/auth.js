import actions from 'constants/actions'

export const loginSuccess = token => ({ type: actions.LOGIN_SUCCESS, payload: { token } })
export const logout = () => ({ type: actions.LOGOUT })

export default {
	loginSuccess,
	logout,
}