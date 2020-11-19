const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'GET_ANECDOTES': {
      return state
    }
    case 'VOTE_ANECDOTE': {
      return state.map(anecdote => anecdote.id === action.data.id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote)
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

export const initAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: { anecdotes }
  }
}

export const addAnecdote = (anecdote) => {
  return {
    type: 'ADD_ANECDOTE',
    data: { anecdote }
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE_ANECDOTE',
    data: { id }
  }
}

export default reducer