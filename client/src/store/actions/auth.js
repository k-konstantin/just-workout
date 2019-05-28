import actions from 'constants/actions'

export const loginSuccess = authData => ({ type: actions.LOGIN_SUCCESS, payload: authData })
export const logout = () => ({ type: actions.LOGOUT })
export const checkTokenStatus = ({ token, expiredAt }) => ({ type: actions.CHECK_TOKEN_STATUS, payload: { token, expiredAt } })

export default {
    loginSuccess,
    logout,
    checkTokenStatus,
}