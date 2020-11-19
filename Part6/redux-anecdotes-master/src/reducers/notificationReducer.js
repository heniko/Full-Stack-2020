const reducer = (state = '', action) => {
    console.log('state now: ', state)
    console.log('action', action)

    switch (action.type) {
        case 'GET_NOTIFICATION': {
            return state
        }
        case 'SET_NOTIFICATION': {
            return action.data.content
        }
        default: {
            return state
        }
    }
}

let timer

export const setNotification = (content) => {
    return async dispatch => {
        if (content !== '') {
            clearTimeout(timer)
            timer = setTimeout(() => {
                dispatch(setNotification(''))
            }, 5000)
        }
        dispatch({
            type: 'SET_NOTIFICATION',
            data: { content }
        })
    }
}

export default reducer