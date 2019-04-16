import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { Route, Redirect, Switch } from 'react-router'

import Layout from './components/layout/Layout'
import RegForm from './components/auth/RegForm/RegForm'
import LoginForm from './components/auth/LoginForm/LoginForm'
import Logout from './components/auth/Logout/Logout'
import MainPage from './components/auth/MainPage/MainPage'
import { isAuthenticated } from './store/selectors/auth'

const App = ({ isAuthenticated }) => (
	<BrowserRouter>
		<Layout>
			{isAuthenticated ? (
				<Switch>
					<Route path='/' exact render={() => <div>Profile Page</div>} />
					<Route path='/logout' exact component={Logout} />
					<Redirect to='/' />
				</Switch>
			) : (
				<Switch>
					<Route path='/registration' component={RegForm} />
					<Route path='/login' exact component={LoginForm} />
					<Route path='/' exact component={MainPage} />
					<Redirect to='/' />
				</Switch>
			)}
		</Layout>
	</BrowserRouter>
)

export default connect(
	state => ({
		isAuthenticated: isAuthenticated(state)
	})
)(App)
