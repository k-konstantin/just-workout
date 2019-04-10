import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const isTest = process.env.NODE_ENV === 'test'
const isDev = process.env.NODE_ENV === 'development'

export default {
	port: process.env.PORT || (isTest ? 4001 : 4000),
	public: path.join(process.cwd(), 'client', 'build'),
	mongoURI: (process.env.MONGO_URI || 'mongodb://localhost:27017') + (isTest ? '/just-workout-test' : '/just-workout'),
	mongooseDebug: isDev,

	crypto: {
		hash: {
			iterations: 10000,
			length: 64,
		}
	},

	transport: {
		service: 'Gmail',
		auth: {
			// должени быть включен доступ для небезопасных приложений, иначе не проходит
			// как сделать приложение безопасным?
			user: process.env.SMTP_EMAIL,
			pass: process.env.SMTP_PASSWORD,
		}
	},

	testEmail: process.env.TEST_EMAIL
}