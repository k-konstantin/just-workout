import React from 'react'
import { Form, Input } from 'semantic-ui-react'

import '../../../css/RenderField.css'

const RenderField = ({ input, label, type, meta: { touched, error } }) => (
	<Form.Field
		error={touched && error}>
		<label>{label}</label>
		<Input
			{...input}
			type={type}
			placeholder={label}
		/>
		{touched && error && <small className='helper'>{error}</small>}
	</Form.Field>
)

export default RenderField