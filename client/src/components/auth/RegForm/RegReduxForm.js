import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Message, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import RenderField from '../../common/form/RenderField'

const form = props => {
	const { handleSubmit, error } = props

	return (
		<div>
			<Message
				attached
				header='Регистрация'
				content='Заполните поля, чтобы зарегистрироваться.'
			/>
			<Form
				error={!!error}
				className='attached fluid segment'
				onSubmit={handleSubmit}
			>
				<Field name="displayName" component={RenderField} label="Display Name" type="text" />
				<Field name="email" component={RenderField} label="Email" type="email" />
				<Field name="password" component={RenderField} label="Password" type="password" />
				<Button>Submit</Button>
				<Message
					error
					header='Ошибка при регистрации'
					content={error}
				/>
			</Form>
			<Message attached='bottom' warning>
				<Icon name='help' />
				Already signed up?&nbsp;<Link to='/login'>Login here</Link>&nbsp;instead.
			</Message>
		</div>
	)
}

export default reduxForm({
	form: 'reg'
})(form)
