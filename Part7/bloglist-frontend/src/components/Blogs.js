import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Blogs = () => {
    const blogs = useSelector(state => state.blog)

    const simpleBlog = (blog) => {
        return (
            <ListGroup.Item key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>
                    {blog.title}, by {blog.author}
                </Link>
            </ListGroup.Item>
        )
    }

    return (
        <>
            <ListGroup>
                {blogs.map(blog => simpleBlog(blog))}
            </ListGroup>
        </>
    )
}

export default Blogs
