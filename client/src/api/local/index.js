import constants from 'constants/index'

export const setToken = token => {
	localStorage.setItem(constants.TOKEN_NAME, JSON.stringify(token))
}

export const getToken = () => JSON.parse(localStorage.getItem(constants.TOKEN_NAME))

export const removeToken = () => localStorage.removeItem(constants.TOKEN_NAME)

export default {
	setToken,
	getToken,
	removeToken,
}