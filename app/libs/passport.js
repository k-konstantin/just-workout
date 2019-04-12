import passport from 'koa-passport'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import { Strategy as LocalStrategy } from 'passport-local'

import User from 'routes/users/models/user'
import config from 'config'

passport.use(new JwtStrategy(
	{
		jwtFromRequest: ExtractJwt.fromHeader(),
		secretOrKey: config.jwtSecret,
		session: false,
	},
	(jwtPayload, done) => {
		User.findOne({ email: jwtPayload.email }, (err, user) => {
			if (err) {
				return done(err, false)
			}
			if (user) {
				return done(null, user)
			} else {
				return done(null, false)
			}
		})
	}
))

passport.use(new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password',
		session: false,
	},
	(email, password, done) => {
		User.findOne({ email }, (err, user) => {
			if (err) {
				return done(err)
			}
			if (!user) {
				return done(null, false, { message: 'Incorrect username.' })
			}
			if (!user.validPassword(password)) {
				return done(null, false, { message: 'Incorrect password.' })
			}
			if (!user.confirmed) {
				return done(null, false, { message: 'Confirm your email.' })
			}
			return done(null, user)
		})
	}
))

export const localAuthenticate = async (ctx, next) => passport.authenticate('local',
	async (err, user, info, status) => {
		if (err) {
			ctx.throw(500)
		}
		if (user === false) {
			ctx.body = info
			ctx.throw(401)
		} else {
			ctx.state.user = user
			await next()
		}
	}
)(ctx, next)

export default passport