import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

export const store = createStore(combineReducers({
    anecdote: anecdoteReducer,
    notification: notificationReducer
}), applyMiddleware(thunk))