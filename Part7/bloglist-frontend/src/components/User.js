import React from 'react'
import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const User = () => {
    const { id } = useParams()
    const user = useSelector(state => state.users.find(user => user.id === id))
    const userBlogs = useSelector(state => state.blog.filter(blog => blog.user.id === id))

    if (!user) {
        return (
            <></>
        )
    }

    const simpleBlog = (blog) => {
        return (
            <ListGroup.Item key={blog.id}>
                <Link to={`/blogs/${blog.id}`}>
                    {blog.title}
                </Link>
            </ListGroup.Item>
        )
    }

    return (
        <>
            <h2>{user.name} ({user.username})</h2>
            <h5>Added blogs</h5>
            <ListGroup>
                {userBlogs.map(blog => simpleBlog(blog))}
            </ListGroup>
        </>
    )
}

export default User
