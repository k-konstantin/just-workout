import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Layout from './components/layout/Layout'
import RegForm from './components/auth/RegForm/RegForm'
import LoginForm from './components/auth/LoginForm'

const App = props => (
	<BrowserRouter>
		<Layout>
			<Route path='/registration' exact component={RegForm} />
			<Route path='/login' exact component={LoginForm} />
		</Layout>
	</BrowserRouter>
)

export default App;
