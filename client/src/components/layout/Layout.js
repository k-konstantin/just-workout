import React from 'react'
import { Container } from 'semantic-ui-react'

import Header from './Header'
import 'css/layout.css'

const Layout = props => {
	return (
		<div className='layout'>
			<Header />
			<div className='content'>
				<Container>
					{props.children}
				</Container>
			</div>
			<footer className='footer'>Some footer</footer>
		</div>
	)
}

export default Layout