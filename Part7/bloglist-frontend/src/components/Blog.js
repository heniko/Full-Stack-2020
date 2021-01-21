import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'

import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = () => {
  const { id } = useParams()
  const user = useSelector(state => state.user)
  const blog = useSelector(state => state.blog.find(blog => blog.id === id))
  const dispatch = useDispatch()

  if (!blog || !user) {
    return (
      <></>
    )
  }

  const like = () => {
    dispatch(likeBlog(blog))
  }

  const del = () => {
    dispatch(deleteBlog(blog, user))
  }

  return (
    <>
      <h3>{blog.title}, by {blog.author}</h3>
      <div>
        {blog.likes} likes
      </div>
      <div>
        added by {blog.user.name}
      </div>
      <div>
        <Button variant='success' onClick={like}>Like</Button>
        {blog.user.username === user.username ? <Button variant='danger' onClick={del}>Delete</Button> : <></>}
      </div>
    </>
  )
}

export default Blog