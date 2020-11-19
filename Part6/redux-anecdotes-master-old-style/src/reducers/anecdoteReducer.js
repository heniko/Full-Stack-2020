import anecdoteService from '../services/anecdotes'
import { setNotification } from './notificationReducer'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'GET_ANECDOTES': {
      return state
    }
    case 'VOTE_ANECDOTE': {
      return state.map(anecdote => anecdote.id === action.data.anecdote.id ? action.data.anecdote : anecdote)
    }
    case 'ADD_ANECDOTE': {
      return [...state, action.data.anecdote]
    }
    case 'INIT_ANECDOTES': {
      return action.data.anecdotes
    }
    default: {
      return state
    }
  }

}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: { anecdotes }
    })
  }
}

export const addAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(setNotification(`You created '${newAnecdote.content}'`, 5))
    dispatch({
      type: 'ADD_ANECDOTE',
      data: { anecdote: newAnecdote }
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    console.log(anecdote)
    const changedAnecdote = await anecdoteService.voteAnecdote({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch(setNotification(`You voted '${changedAnecdote.content}'`, 5))
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: { anecdote: changedAnecdote }
    })
  }
}

export default reducer