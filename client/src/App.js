import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import Layout from './components/layout/Layout'
import RegForm from './components/auth/RegForm/RegForm'
import LoginForm from './components/auth/LoginForm/LoginForm'
import { isAuthenticated } from './store/selectors/auth'

const App = ({ isAuthenticated }) => (
	<BrowserRouter>
		<Layout>
			{isAuthenticated ? (
				<div>Logout</div>
			) : (
				<Fragment>
					<Route path='/registration' exact component={RegForm} />
					<Route path='/login' exact component={LoginForm} />
				</Fragment>
			)}
		</Layout>
	</BrowserRouter>
)

export default connect(
	state => ({
		isAuthenticated: isAuthenticated(state)
	})
)(App)
