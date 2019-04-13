import React from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const Layout = props => {
	return (
		<div>
			<header>
				<Menu inverted>
					<Link to='/login'>
						<Menu.Item
							name='Login'
							active={props.location.pathname === '/login'}
							color='olive'
						/>
					</Link>
					<Link to='/registration'>
						<Menu.Item
							name='Registration'
							active={props.location.pathname === '/registration'}
							color='orange'
						/>
					</Link>
				</Menu>
			</header>
			<div>{props.children}</div>
			<footer>Some footer</footer>
		</div>
	)
}

export default withRouter(Layout)