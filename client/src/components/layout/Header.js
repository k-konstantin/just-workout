import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Menu, Container } from 'semantic-ui-react'

import { isAuthenticated } from 'store/selectors/auth';

const Header = props => {
    const { isAuthenticated } = props

    return (
        <header>
            <Menu inverted>
                <Container>
                    {!isAuthenticated ? (
                        <Fragment>
                            <Link to='/'>
                                <Menu.Item
                                    name='Main'
                                    active={props.location.pathname === '/'}
                                    color='green'
                                />
                            </Link>
                            <Menu.Menu position='right'>
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
                                        active={props.location.pathname.startsWith('/registration')}
                                        color='orange'
                                    />
                                </Link>
                            </Menu.Menu>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <Menu.Menu>
                                <Link to='/exercises'>
                                    <Menu.Item
                                        name='Exercises'
                                        active={props.location.pathname === '/exercises'}
                                        color='green'
                                    />
                                </Link>
                            </Menu.Menu>
                            <Menu.Menu position='right'>
                                <Link to='/logout'>
                                    <Menu.Item
                                        name='Logout'
                                        color='red'
                                    />
                                </Link>
                            </Menu.Menu>
                        </Fragment>
                    )}
                </Container>
            </Menu>
        </header>
    )
}

export default withRouter(connect(
    state => ({
        isAuthenticated: isAuthenticated(state),
    })
)(Header))