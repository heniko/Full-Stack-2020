const reducer = (state = '', action) => {
    console.log('state now: ', state)
    console.log('action', action)
    switch (action.type) {
        case 'GET_FILTER': {
            return state
        }
        case 'SET_FILTER': {
            return action.data.content
        }
        default: {
            return state
        }
    }
}

export const setFilter = (content) => {
    return async dispatch => {
        dispatch({
            type: 'SET_FILTER',
            data: { content }
        })
    }
}

export default reducer