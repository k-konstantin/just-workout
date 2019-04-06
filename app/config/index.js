import path from 'path'

const isTest = process.env.NODE_ENV === 'test'
const isDev = process.env.NODE_ENV === 'development'

export default {
	port: process.env.PORT || (isTest ? 3001 : 3000),
	public: path.join(process.cwd(), 'client', 'build'),
	mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/' + (isTest ? 'just-workout-test' : 'just-workout'),
	mongooseDebug: isDev,

	crypto: {
		hash: {
			iterations: 10000,
			length: 64,
		}
	},
}