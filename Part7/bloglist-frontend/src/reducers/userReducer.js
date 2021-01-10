import loginService from '../services/login'
import { notify } from './notificationReducer'

const initialState = null

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.data
        case 'LOGOUT':
            return initialState
        default:
            return state
    }
}

export const setUser = (user) => {
    return async dispatch => {
        dispatch({
            type: 'LOGIN',
            data: user
        })
    }
}

export const login = (username, password) => {
    return async dispatch => {
        try {
            const user = await loginService.login({
                username: username.value,
                password: password.value
            })
            username.reset()
            password.reset()
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            dispatch({
                type: 'LOGIN',
                data: user
            })
            notify('Logged in successfully')
        } catch (error) {
            notify('wrong username or password', 'error')
        }
    }
}

export const logout = () => {
    return async dispatch => {
        window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(null))
        dispatch({
            type: 'LOGOUT'
        })
        notify('logged out successfully')
    }
}

export default userReducer