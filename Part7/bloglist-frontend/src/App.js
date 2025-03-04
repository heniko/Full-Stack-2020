import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Switch, Route } from "react-router-dom"
import { Modal, Button } from 'react-bootstrap'

import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import { setUser } from './reducers/userReducer'
import { setBlogs } from './reducers/blogReducer'
import usersService from './services/users'
import { setUsers } from './reducers/usersReducer'
import Users from './components/Users'
import User from './components/User'
import Blogs from './components/Blogs'
import Header from './components/Header'

const App = () => {
  const [showBlogForm, setShowBlogForm] = useState(false)
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

  useEffect(() => {
    usersService.getAll().then(users => {
      dispatch(setUsers(users))
    })
  }, [dispatch])

  const handleShowBlogForm = () => setShowBlogForm(true)

  const handleHideBlogForm = () => setShowBlogForm(false)

  return (
    <div className='page'>
      <Header></Header>
      <div className='container'>
        <Notification />
        <div>
          <Button variant='primary' onClick={handleShowBlogForm}>Add blog</Button>
          <Modal show={showBlogForm} onHide={handleHideBlogForm}>
            <Modal.Header closeButton>
              <Modal.Title>Add blog</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <BlogForm handleHideBlogForm={handleHideBlogForm}/>
            </Modal.Body>
          </Modal>
          <Switch>
            <Route path='/users/:id' component={User} />
            <Route path='/users'>
              <Users></Users>
            </Route>
            <Route path='/blogs/:id' component={Blog} />
            <Route path='/blogs'>
              <Blogs></Blogs>
            </Route>
            <Route path='/'>
            </Route>
          </Switch>
        </div>
      </div>
    </div>

  )
}

export default App