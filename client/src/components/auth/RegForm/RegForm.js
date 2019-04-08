import React, { Component } from 'react'
import { SubmissionError } from 'redux-form'
import { Redirect } from 'react-router'

import api from '../../../api/rest'
import RegReduxForm from './RegReduxForm'

class RegForm extends Component {
	state = {
		submitSuccess: false,
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
				<Redirect to='/' />
			) : (
				<RegReduxForm
					onSubmit={this.onSubmit}
				/>
			)
		)
	}
}

export default RegForm