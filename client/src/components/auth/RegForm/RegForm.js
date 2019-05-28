import React from 'react'
import { SubmissionError } from 'redux-form'
import { Redirect, withRouter, Switch, Route } from 'react-router'

import api from '../../../api/rest'
import RegReduxForm from './RegReduxForm'
import SuccessRegForm from './SuccessRegForm'

const RegForm = props => {
	const onSuccessSubmit = () => {
		props.history.push('/login')
	}
	const onSubmit = (values, dispatch) => api.createUser(values)
		.then(response => {
			if (response.errors) {
				throw new SubmissionError(response.errors)
			}

			props.history.push('/registration/success')
		})

	return (
		<Switch>
			<Route path='/registration' exact render={
				() => <RegReduxForm onSubmit={onSubmit} />
			} />
			<Route path='/registration/success' exact render={
				() => <SuccessRegForm onSubmit={onSuccessSubmit} />
			} />
			<Redirect to='/registration' />
		</Switch>
	)
}

export default withRouter(RegForm)