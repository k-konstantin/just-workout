import { put, takeEvery, delay, cancel, fork, take, call } from 'redux-saga/effects'

import actionTypes from 'constants/actions'
import actions from 'store/actions/auth'
import localApi from 'api/local'

function* onLoginSuccess(action) {
	const { token, expiredAt } = action.payload

	yield call(localApi.setToken, { token, expiredAt })

	const task = yield fork(logoutOnTokenExpired, expiredAt - Date.now())

	yield take(actionTypes.LOGOUT)
	yield cancel(task)
	yield call(localApi.removeToken)
}

function* logoutOnTokenExpired(ms) {
	yield delay(ms)
	yield put(actions.logout())
}

function* checkTokenStatus(action) {
	const { expiredAt, token } = action.payload

	if (Date.now() < expiredAt) {
		yield put(actions.loginSuccess({ token, expiredAt }))
	} else {
		yield put(actions.logout())
	}
}

export default [
	takeEvery(actionTypes.LOGIN_SUCCESS, onLoginSuccess),
	takeEvery(actionTypes.CHECK_TOKEN_STATUS, checkTokenStatus),
]