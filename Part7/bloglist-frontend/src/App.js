import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { logout, setUser } from './reducers/userReducer'
import { setBlogs } from './reducers/blogReducer'


const App = () => {
  const blogs = useSelector(state => state.blog)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(setBlogs(blogs))
    )
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [dispatch])

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogAppUser')
      dispatch(logout())
    } catch (e) { }
  }

  const rows = () => blogs.map(blog =>
    <Blog key={blog.id} blog={blog} />
  )

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm />
      </Togglable>
    )
  }

  const newBlogForm = () => {
    return (
      <Togglable buttonLabel='Add blog'>
        <BlogForm />
      </Togglable>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      {user === null ?
        <div>
          {loginForm()}
        </div>
        :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {newBlogForm()}
          {rows()}
        </div>
      }
    </div>
  )
}

export default App