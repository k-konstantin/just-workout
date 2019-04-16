import React, { Component } from 'react'
import { SubmissionError } from 'redux-form'
import { Container } from 'semantic-ui-react'

import api from 'api/rest'
import LoginReduxForm from './LoginReduxForm'
import actions from 'store/actions/auth'

class RegForm extends Component {
	onSubmit = (values, dispatch) => api.loginUser(values)
		.then(authData => {
			if (authData.errors) {
				throw new SubmissionError(authData.errors)
			}

			dispatch(actions.loginSuccess(authData))
		})

	render() {
		return (
			<Container>
				<LoginReduxForm onSubmit={this.onSubmit} />
			</Container>
		)
	}
}

export default RegForm