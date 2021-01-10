const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const loginRouter=require('./controllers/login')
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
require('express-async-errors')
const mongoose = require('mongoose')
const blog = require('./models/blog')

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    const { MongoMemoryServer } = require('mongodb-memory-server')
    const mongoServer = new MongoMemoryServer()
    const User = require('./models/user')
    const bcrypt = require('bcrypt')
    mongoose.Promise = Promise
    mongoServer.getUri().then((mongoUri) => {
        const mongooseOpts = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        mongoose.set('useFindAndModify', false)
        mongoose.set('useCreateIndex', true)
        mongoose.connect(mongoUri, mongooseOpts)
        mongoose.connection.on('error', (e) => {
            if (e.message.code === 'ETIMEDOUT') {
                console.log(e)
                mongoose.connect(mongoUri, mongooseOpts)
            }
            console.log(e)
        })
        mongoose.connection.once('open', async () => {
            console.log(`MongoDB successfully connected to ${mongoUri}`)
            const saltRounds = 10
            let passwordHash = await bcrypt.hash('user', saltRounds)
            const user = new User({
                username: 'user',
                name: 'User',
                passwordHash
            })
            await user.save()
            passwordHash = await bcrypt.hash('admin', saltRounds)
            const admin = new User({
                username: 'admin',
                name: 'Admin',
                passwordHash
            })
            await admin.save()

            const blog1 = new blog({
                url: 'url.url',
                title: 'A blog',
                author: 'Auth',
                user: user,
                likes: 2
            })
            await blog1.save()

            const blog2 = new blog({
                url: 'site.url',
                title: 'Another blog',
                author: 'Author',
                user: user,
                likes: 5
            })
            await blog2.save()

            const blog3 = new blog({
                url: 'url',
                title: 'Some blog',
                author: 'Some author',
                user: admin,
                likes: 1
            })
            await blog3.save()
        })
    })

} else if (process.env.NODE_ENV === 'production') {
    mongoose.set('useFindAndModify', false)
    mongoose.set('useCreateIndex', true)
    mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
} else {
    var mongoDB = 'mongodb://localhost:27017/test'
    mongoose.connect(mongoDB, { useNewUrlParser: true })
    var db = mongoose.connection
    db.on('error', console.error.bind(console, 'MongoDB connection error:'))
}
app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(middleware.errorHandler)


module.exports = app