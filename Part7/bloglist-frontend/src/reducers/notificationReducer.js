const notificationReducer = (state = { message: '', type: '' }, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        default:
            return state
    }
}

let timer

export const notify = (message, type) => {
    return async dispatch => {
        if (message !== '') {
            clearTimeout(timer)
            timer = setTimeout(() => {
                dispatch(notify('', ''))
            }, 5000);
        }
        dispatch({
            type: 'SET_NOTIFICATION',
            data: { message, type }
        })
    }
}

export default notificationReducer