import React from 'react'

import Header from './Header'

const Layout = props => {
	return (
		<div>
			<Header />
			<div>{props.children}</div>
			<footer>Some footer</footer>
		</div>
	)
}

export default Layout