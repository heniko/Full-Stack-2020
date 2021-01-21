import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import { useField } from '../hooks/index'
import { login } from '../reducers/userReducer'
import { logout } from '../reducers/userReducer'

const LoginForm = () => {
  const user = useSelector(state=>state.user)
  const username = useField('text')
  const password = useField('password')
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(login(username, password))
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogAppUser')
      dispatch(logout())
    } catch (e) { }
  }

  const userNotLogged = () => {
    return (
      <Form inline onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Control {...username.field} placeholder='Username'></Form.Control>
        <Form.Control {...password.field} placeholder='Password'></Form.Control>
      </Form.Group>
      <Button variant='success' type="submit">Login</Button>
    </Form>
    )
  }

  const userLogged = () => {
    return(
      <>
      Logged in as {user.name}
      <Button variant='danger' onClick={handleLogout}>Logout</Button>
      </>
    )
  }

  return (
    <>
    {user
      ?
      userLogged()
      :
      userNotLogged()
    }
    </>
  )
}

export default LoginForm