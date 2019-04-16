import React from 'react'

import Header from './Header'
import 'css/layout.css'

const Layout = props => {
	return (
		<div className='layout'>
			<Header />
			<div className='content'>{props.children}</div>
			<footer className='footer'>Some footer</footer>
		</div>
	)
}

export default Layout