import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const user = useSelector(state => state.user)
  const showDelete = { display: user.username === blog.user.username ? '' : 'none' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const dispatch = useDispatch()
  const toggleVisible = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const like = () => {
    dispatch(likeBlog(blog))
  }

  const del = () => {
    dispatch(deleteBlog(blog, user))
  }

  return (
    <div style={blogStyle}>
      <div onClick={() => toggleVisible()}>
        {blog.title}, by {blog.author}
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.url}
        </div>
        <div>
          {blog.likes}
          <button onClick={like}>like</button>
        </div>
        <div>
          added by {blog.user.name}
        </div>
        <div style={showDelete}>
          <button onClick={del}>delete</button>
        </div>
      </div>
    </div>
  )
}

export default Blog