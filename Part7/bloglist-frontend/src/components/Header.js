import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import LoginForm from './LoginForm'

const Header = () => {
    return (
        <Navbar className="bg-secondary d-flex bd-highlight mb-3" expand="lg">
            <Navbar.Toggle className='hidden-nav' aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse>
                <Nav className="mr-auto">
                    <Navbar.Brand className="p-1 col-example">
                        Blog
                    </Navbar.Brand>
                    <LinkContainer to='/blogs'>
                        <Nav.Link>
                            Blogs
                        </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/users'>
                        <Nav.Link>
                            Users
                        </Nav.Link>
                    </LinkContainer>
                </Nav>
                <Nav className='mr-right'>
                    <Nav.Item>
                        <LoginForm></LoginForm>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header
