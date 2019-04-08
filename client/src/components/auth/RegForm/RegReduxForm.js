import React from 'react'
import { Field, reduxForm } from 'redux-form'

import RenderField from '../../common/form/RenderField'

const form = props => {
	const { handleSubmit, error } = props

	return (
		<form onSubmit={handleSubmit}>
			<Field name="displayName" component={RenderField} label="Display Name" type="text" />
			<Field name="email" component={RenderField} label="Email" type="email" />
			<Field name="password" component={RenderField} label="Password" type="password" />
			<button type="submit">Submit</button>
			<div>{`Server error ${error}`}</div>
		</form>
	)
}

export default reduxForm({
	form: 'reg'
})(form)
