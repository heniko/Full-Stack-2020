import React, { useState, useEffect } from 'react'
import {useMutation} from '@apollo/client'

import { LOGIN } from '../queries'

const LoginForm = ({ show, setToken }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login, result] = useMutation(LOGIN)

    useEffect(() => {
        if(result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('kirjasto-user-token', token)
        }
    }, [result.data])

    const handleLogin = (event) => {
        event.preventDefault()

        login({
            variables: {username, password}
        })

        setUsername('')
        setPassword('')
    }

    if (!show) {
        return null
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    username<input
                        type='text'
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password<input
                        type='password'
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default LoginForm