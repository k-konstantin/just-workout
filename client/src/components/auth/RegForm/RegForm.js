import React, { Component } from 'react'
import { SubmissionError } from 'redux-form'
import { Redirect, withRouter, Switch, Route } from 'react-router'

import api from '../../../api/rest'
import RegReduxForm from './RegReduxForm'
import SuccessRegForm from './SuccessRegForm'

class RegForm extends Component {
	onSuccessSubmit = () => {
		this.props.history.push('/login')
	}
	onSubmit = (values, dispatch) => api.createUser(values)
		.then(response => {
			if (response.errors) {
				throw new SubmissionError(response.errors)
			}

			this.props.history.push('/registration/success')
		})

	render() {
		return (
			<Switch>
				<Route path='/registration' exact render={
					() => <RegReduxForm onSubmit={this.onSubmit} />
				} />
				<Route path='/registration/success' exact render={
					() => <SuccessRegForm onSubmit={this.onSuccessSubmit} />
				} />
				<Redirect to='/registration' />
			</Switch>
		)
	}
}

export default withRouter(RegForm)