export const isAuthenticated = state => state.auth.isAuthenticated
export const getToken = state => state.auth.token
export const getExpiredAt = state => state.auth.expiredAt

export default {
	isAuthenticated,
	getToken,
	getExpiredAt,
}