import React from 'react'
import PropTypes from 'prop-types'

import { Form, Button, Message } from 'semantic-ui-react'

const SuccessRegForm = props => {
    const { onSubmit } = props
    return (
        <Form success>
            <Message success header='Вы зарегистрировались' content="Подтвердите регистрацию перейдя по ссылке в пиьсме, отправленном вам на почту." />
            <Button onClick={onSubmit}>To login</Button>
        </Form>
    )
}

SuccessRegForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

export default SuccessRegForm