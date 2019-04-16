import { put, takeEvery, delay, cancel, fork, take } from 'redux-saga/effects'
import jwt from 'jsonwebtoken'

import actionTypes from 'constants/actions'
import actions from 'store/actions/auth'

function* onLoginSuccess(action) {
	const { token } = action.payload
	const { exp, iat } = jwt.decode(token)
	const task = yield fork(logoutAfterSeconds, (exp - iat) * 1000)
	yield take(actionTypes.LOGOUT)
	yield cancel(task)
}

function* logoutAfterSeconds(seconds) {
	yield delay(seconds)
	yield put(actions.logout())
}

export default [
	takeEvery(actionTypes.LOGIN_SUCCESS, onLoginSuccess)
]