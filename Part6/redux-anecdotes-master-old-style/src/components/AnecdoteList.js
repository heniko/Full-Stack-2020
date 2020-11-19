import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
    const vote = (anecdote) => {
        props.voteAnecdote(anecdote)
    }

    return (
        <>
            {props.anecdotes?.sort((a, b) => (a.votes === b.votes) ? 0 : ((a.votes > b.votes) ? -1 : 1)).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        anecdotes: state.anecdote.filter(anecdote => anecdote.content.includes(state.filter))
    }
}

const mapDispatchToProps = {
    voteAnecdote
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)