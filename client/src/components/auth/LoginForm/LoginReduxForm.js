import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Message, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import RenderField from 'components/common/form/RenderField'

const form = props => {
	const { handleSubmit, error, submitting } = props

	return (
		<div>
			<Message
				attached
				header='Вход в приложение'
				content='Заполните поля, чтобы войти.'
			/>
			<Form
				loading={submitting}
				error={!!error}
				className='attached fluid segment'
				onSubmit={handleSubmit}
			>
				<Field name="email" component={RenderField} label="Email" type="email" />
				<Field name="password" component={RenderField} label="Password" type="password" />
				<Button>Submit</Button>
				<Message
					error
					header='Ошибка при входе'
					content={error}
				/>
			</Form>
			<Message attached='bottom' warning>
				<Icon name='help' />
				Ещё не зарегистрированы?&nbsp;<Link to='/registration'>Зарегистируйте</Link>&nbsp;свой аккаунт.
			</Message>
		</div>
	)
}

export default reduxForm({
	form: 'login'
})(form)
