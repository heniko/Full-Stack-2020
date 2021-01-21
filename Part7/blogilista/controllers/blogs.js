const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

const getTokenFrom = (request) => {
    const auth = request.get('authorization')
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
        return auth.substring(7)
    }
    return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs.map(b => b.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    const token = getTokenFrom(request)

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)

        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const user = await User.findById(decodedToken.id)
        if (!user) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: 0,
            user: user,
            comments: []
        })

        const saved = await blog.save()
        response.status(200).json(saved)
    } catch (error) {
        next(error)
    }
})

blogsRouter.post('/:id/like', async (request, response, next) => {
    try {
        const oldBlog = await Blog.findById(request.params.id)
        const updated = await Blog
            .findByIdAndUpdate(oldBlog.id, { likes: oldBlog.likes + 1 }, { new: true, runValidators: true, context: 'query' })
            .populate('user', { username: 1, name: 1, id: 1 })
        response.status(200).json(updated)
    } catch (error) {
        next(error)
    }
})

blogsRouter.post('/:id/comment', async (request, response, next) => {
    try {
        if (!request.body.comment) {
            response.status(400).end()
        }

        const oldBlog = await Blog.findById(request.params.id)
        const newComments = [...oldBlog.comments, request.body.comment]
        const updated = await Blog
            .findByIdAndUpdate(oldBlog.id, { comments: newComments }, { new: true, runValidators: true, context: 'query' })
            .populate('user', { username: 1, name: 1, id: 1 })
        response.status(200).json(updated)
    } catch (error) {
        next(error)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (error) {
        next(error)
    }
})

module.exports = blogsRouter