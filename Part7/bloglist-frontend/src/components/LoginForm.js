import React from 'react'
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
    <form onSubmit={handleSubmit}>
      <div>
        <h2>log in to application</h2>
        käyttäjätunnus
        <input {...username.field} />
      </div>
      <div>
        salasana
        <input {...password.field} />
      </div>
      <button type="submit">kirjaudu</button>
    </form>
  )
}

export default LoginForm