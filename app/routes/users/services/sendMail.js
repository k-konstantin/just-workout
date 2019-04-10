import nodemailer from 'nodemailer'
import stubTransport from 'nodemailer-stub-transport'

import config from 'config'

const transport = process.env.NODE_ENV === 'test' ? nodemailer.createTransport(stubTransport()) : nodemailer.createTransport(config.transport)

const mailData = {
	from: config.transport.auth.user,
	to: config.testEmail,
	subject: 'Testing nodemailer',
	text: 'Очень важное сообщение',
}

export default async (user) => {

	mailData.text = `Привет, ${user.displayName}! Вы только что зарегистрировались на сайте. Чтобы подтвердить регистрацию
	перейдите пожалуйста по ссылке: http://localhost:3000/users/confirmed/${user.confirmToken}
	Если вы не регистрировались на сайте, перейдите по ссылке: http://localhost:3000/users/reject/${user.confirmToken}`

	return await transport.sendMail(mailData)
}
