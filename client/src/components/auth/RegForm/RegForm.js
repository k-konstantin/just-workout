import React, { Component } from 'react'
import { SubmissionError } from 'redux-form'
import { Redirect } from 'react-router'

import api from '../../../api/rest'
import RegReduxForm from './RegReduxForm'
import SuccessRegForm from './SuccessRegForm'

class RegForm extends Component {
	state = {
		submitSuccess: false,
		redirect: false,
	}
	onSuccessSubmit = () => {
		this.setState({ redirect: true })
	}
	onSubmit = (values, dispatch) => api.createUser(values)
		.then(response => {
			if (response.errors) {
				throw new SubmissionError(response.errors)
			}

			this.setState({ submitSuccess: true })
		})

	render() {
		return (
			this.state.submitSuccess ? (
				this.state.redirect ? (
					<Redirect to='/login' />
				) : (
					<SuccessRegForm onSubmit={this.onSuccessSubmit} />
				)
			) : (
				<RegReduxForm
					onSubmit={this.onSubmit}
				/>
			)
		)
	}
}

export default RegForm