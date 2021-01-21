import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

import { useField } from '../hooks/index'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = ({handleHideBlogForm}) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const handleSubmit = (event) => {
    event.preventDefault()
    const blogObj = {
      title: title.value,
      author: author.value,
      url: url.value
    }
    title.reset()
    author.reset()
    url.reset()
    dispatch(createBlog(blogObj, user))
    handleHideBlogForm()
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>
          Title
        </Form.Label>
        <Form.Control {...title.field}></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Author
        </Form.Label>
        <Form.Control {...author.field}></Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>
          Url
        </Form.Label>
        <Form.Control {...url.field}></Form.Control>
      </Form.Group>
      <Button variant='success' type="submit">Create</Button>
    </Form>
  )
}

export default BlogForm