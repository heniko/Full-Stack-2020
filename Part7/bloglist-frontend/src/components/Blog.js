import React from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ListGroup, Form, Button } from 'react-bootstrap'

import { deleteBlog, likeBlog, addComment } from '../reducers/blogReducer'
import { useField } from '../hooks/index'

const Blog = () => {
  const { id } = useParams()
  const user = useSelector(state => state.user)
  const blog = useSelector(state => state.blog.find(blog => blog.id === id))
  const dispatch = useDispatch()
  const commentField = useField('text')

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

  const handleSubmitComment = (event) => {
    event.preventDefault()
    const comment = {
      comment: commentField.value
    }
    dispatch(addComment(blog, comment))
    commentField.reset()
  }

  const getCliccableLink = () => {
    return blog.url.startsWith('http://') || blog.url.startsWith('https://') ? blog.url : `http://${blog.url}`
  }

  const simpleComment = (comment, index) => {
    return (
      <ListGroup.Item key={index}>
        <p>{comment}</p>
      </ListGroup.Item>
    )
  }

  return (
    <>
      <h3>{blog.title}, by {blog.author}</h3>
      <div>
        {blog.likes} likes
      </div>
      <div>
        <a href={getCliccableLink()} target='_blank' rel='noopener noreferrer'>{blog.url}</a>
      </div>
      <div>
        added by {blog.user.name}
      </div>
      <div>
        <Button variant='success' onClick={like}>Like</Button>
        {blog.user.username === user.username ? <Button variant='danger' onClick={del}>Delete</Button> : <></>}
      </div>
      <ListGroup>
        {blog.comments.map((comment, index) => simpleComment(comment, index))}
      </ListGroup>
      <Form onSubmit={handleSubmitComment}>
        <Form.Control {...commentField.field} placeholder='New comment'></Form.Control>
        <Button variant='success' type='submit'>Add comment</Button>
      </Form>
    </>
  )
}

export default Blog