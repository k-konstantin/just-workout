import React, { Component } from 'react'
import { SubmissionError } from 'redux-form'
import { Container } from 'semantic-ui-react'

import api from 'api/rest'
import LoginReduxForm from './LoginReduxForm'
import actions from 'store/actions/auth'

class LoginForm extends Component {
	onSubmit = (values, dispatch) => api.loginUser(values)
		.then(({ errors, displayName, email, token, expiredAt }) => {
			if (errors) {
				throw new SubmissionError(errors)
			}

			dispatch(actions.loginSuccess({ displayName, email, token, expiredAt }))
		})

	render() {
		return (
			<Container>
				<LoginReduxForm onSubmit={this.onSubmit} />
			</Container>
		)
	}
}

export default LoginForm