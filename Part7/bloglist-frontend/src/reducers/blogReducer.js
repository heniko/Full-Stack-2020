import blogService from '../services/blogs'
import { notify } from './notificationReducer'

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_BLOGS':
            return sortedBlogs(action.data)
        case 'DELETE_BLOG':
            return state.filter(blog => blog.id !== action.data)
        case 'NEW_BLOG':
            return sortedBlogs([...state, action.data])
        case 'REPLACE_BLOG':
            return sortedBlogs(state.map(blog => blog.id === action.data.id ? action.data : blog))
        default:
            return state
    }
}

const sortedBlogs = (unsorted) => {
    return unsorted?.sort((a, b) => { return b.likes - a.likes })
}

export const deleteBlog = (blog, user) => {
    return async dispatch => {
        try {
            await blogService.deleteBlog(blog.id, user)
            dispatch({
                type: 'DELETE_BLOG',
                data: blog.id
            })
            dispatch(notify(`Blog '${blog.title}' poistettu palvelimelta`, 'normal'))
        } catch (error) {
            dispatch(notify('Blogin poistaminen ei onnistunut', 'error'))
        }
    }
}

export const setBlogs = (blogs) => {
    return async dispatch => {
        dispatch({
            type: 'SET_BLOGS',
            data: blogs
        })
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        try {
            const likedBlog = await blogService.like(blog.id)
            dispatch({
                type: 'REPLACE_BLOG',
                data: likedBlog
            })
        } catch (error) {
            dispatch(notify(`Blog '${blog.title}' on jo valitettavasti poistettu palvelimelta`, 'error'))
            dispatch({
                type: 'DELETE_BLOG',
                data: blog.id
            })
        }
    }
}

export const createBlog = (blogObj, user) => {
    return async dispatch => {
        try {
            const newBlog = await blogService.create(blogObj, user)
            dispatch({
                type: 'NEW_BLOG',
                data: newBlog
            })
            dispatch(notify(`Blogi "${blogObj.title}" lisätty`))
        } catch (error) {
            dispatch(notify(`Blogin tallentamisessa tapahtui virhe`, error))
        }
    }
}

export const addComment = (blog, comment) => {
    return async dispatch => {
        try {
            const commentedBlog = await blogService.comment(blog.id, comment)
            dispatch({
                type: 'REPLACE_BLOG',
                data: commentedBlog
            })
            dispatch(notify('Kommentti lisätty!'))
        }catch (error) {
            dispatch(notify(`Blog '${blog.title}' on jo valitettavasti poistettu palvelimelta`, 'error'))
            dispatch({
                type: 'DELETE_BLOG',
                data: blog.id
            })
        }
    }
}

export default blogReducer