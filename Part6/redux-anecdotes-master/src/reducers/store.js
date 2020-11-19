import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './anecdoteReducer'

export const store = createStore(combineReducers({
    anecdote: anecdoteReducer
}))