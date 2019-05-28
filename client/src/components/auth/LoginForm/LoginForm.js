import React, { Fragment } from 'react'
import { SubmissionError, Field, reduxForm } from 'redux-form'
import { Button, Form, Message, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import api from 'api/rest'
import RenderField from 'components/common/form/RenderField'
import actions from 'store/actions/auth'

const LoginForm = props => {
    const { handleSubmit, error, submitting } = props

    const onSubmit = (values, dispatch) => api.loginUser(values)
        .then(({ errors, displayName, email, token, expiredAt }) => {
            if (errors) {
                throw new SubmissionError(errors)
            }

            dispatch(actions.loginSuccess({ displayName, email, token, expiredAt }))
        })

    return (
        <Fragment>
            <Message
                attached
                header='Вход в приложение'
                content='Заполните поля, чтобы войти.'
            />
            <Form
                loading={submitting}
                error={!!error}
                className='attached fluid segment'
                onSubmit={handleSubmit(onSubmit)}
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
        </Fragment>
    )
}

export default reduxForm({
    form: 'login'
})(LoginForm)