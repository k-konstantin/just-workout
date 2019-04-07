import React from 'react'
import { Link } from 'react-router-dom'

const Layout = props => (
	<div>
		<header>
			<Link to='/login'>Login</Link>
			<Link to='/registration'>Registration</Link>
		</header>
		<div>{props.children}</div>
		<footer>Some footer</footer>
	</div>
)

export default Layout