import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdote)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(setNotification(`You voted '${anecdotes.filter(anecdote => anecdote.id === id)[0].content}'`))
        dispatch(voteAnecdote(id))
    }

    return (
        <>
            {anecdotes.filter(anecdote => anecdote.content.includes(filter)).sort((a, b) => (a.votes === b.votes) ? 0 : ((a.votes > b.votes) ? -1 : 1)).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList