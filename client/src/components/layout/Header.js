import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

import { isAuthenticated } from 'store/selectors/auth';

const Header = props => {
	const { isAuthenticated } = props

	return (
		<header>
			<Menu inverted>
				{!isAuthenticated ? (
					<Fragment>
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
					</Fragment>
				) : (
					<Menu.Menu position='right'>
						<Link to='/logout'>
							<Menu.Item
								name='Logout'
								position='right'
								color='red'
							/>
						</Link>
					</Menu.Menu>
				)}
			</Menu>
		</header>
	)
}

export default withRouter(connect(
	state => ({
		isAuthenticated: isAuthenticated(state),
	})
)(Header))