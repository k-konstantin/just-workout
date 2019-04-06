import path from 'path'

export default {
	port: process.env.PORT || 3000,
	public: path.join(process.cwd(), 'client', 'build'),
}