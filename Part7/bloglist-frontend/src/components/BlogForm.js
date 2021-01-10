import React from 'react'
import { useField } from '../hooks/index'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
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
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title:
        <input {...title.field} />
      </div>
      <div>
        author:
        <input {...author.field} />
      </div>
      <div>
        url:
        <input {...url.field} />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm