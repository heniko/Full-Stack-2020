import React from 'react'
import { Button, Form } from 'react-bootstrap'

import { useField } from '../hooks/index'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/userReducer'

const LoginForm = () => {
  const username = useField('text')
  const password = useField('password')
  const dispatch = useDispatch()

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(login(username, password))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>
          Username
        </Form.Label>
        <Form.Control {...username.field}></Form.Control>
        <Form.Label>
          Password
        </Form.Label>
        <Form.Control {...password.field}></Form.Control>
      </Form.Group>
      <Button variant='success' type="submit">Login</Button>
    </Form>
  )
}

export default LoginForm