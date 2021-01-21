import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {Table} from 'react-bootstrap'

const Users = () => {
    const users = useSelector(state => state.users)
    const blogs = useSelector(state => state.blog)

    const countBlogs = (username) => {
        return blogs.filter(blog => blog.user.username === username).length
    }

    const simpleUser = (user) => {
        return (
            <tr key={user.id}>
                <th>
                    <Link to={`/users/${user.id}`}>
                        {user.name}
                    </Link>
                </th>
                <th>{countBlogs(user.username)}</th>
            </tr >
        )
    }

    return (
        <>
            <Table striped>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Blogs</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => simpleUser(user))}
                </tbody>
            </Table>
        </>
    )
}

export default Users