const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')

const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoserver = new MongoMemoryServer()

const JWT_SECRET = 'SUPER_SEKRET'

mongoserver.getUri().then((mongoUri) => {
  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
  mongoose.set('useFindAndModify', false)
  mongoose.connect(mongoUri, mongooseOpts)
    .then(() => {
      console.log('Connected to MongoDB')
    })
    .catch((error) => {
      console.log('error connecting to MongoDB', error.message)
    })
})
mongoose.connection.once('open', async () => {
  const auth = new Author({
    name: 'Robert Martin',
    born: 1952,
  })
  await auth.save()

  const book = new Book({
    title: 'Clean Code',
    published: 2008,
    author: auth,
    genres: ['refactoring']
  })
  await book.save()
})

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
      authorCount: Int!
      bookCount: Int!
      allBooks(author:String, genre:String): [Book!]!
      allAuthors: [Author!]!
      me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int
    ): Author
    createUser(
      username: String!
      favouriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    authorCount: async () => await Author.find({}).length,
    bookCount: async () => await Book.find({}).length,
    allBooks: async (root, args) => {
      let res = await Book.find({}).populate('author', { name: 1, id: 1, born: 1 })
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        res = res.filter(book => book.author === author.id)
      }

      if (args.genre) {
        res = res.filter(book => book.genres.includes(args.genre))
      }

      return res
    },
    allAuthors: async () => await Author.find({}),
    me: async (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name })
      const books = await Book.find({ author: author.id })
      return books.length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      try {
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          author = new Author({ name: args.author })
          await author.save()
        }
        const book = new Book({ ...args, author: author })
        await book.save()

        return book
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      try {
        const author = await Author.findOne({ name: args.name })
        if (!author) {
          return null
        }

        res = await Author.findByIdAndUpdate(author.id, { born: args.setBornTo }, { new: true, runValidators: true, context: 'query' })
        return res
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: async (root, args) => {
      try {
        const newUser = new User({ ...args })
        return await newUser.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    login: async (root, args) => {
      try {
        const user = await User.findOne({ username: args.username })

        if (!user || args.password !== 'sekret') {
          throw new UserInputError('Wrong username or password')
        }

        const userForToken = {
          username: user.username,
          id: user.id
        }

        return { value: jwt.sign(userForToken, JWT_SECRET) }
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )

      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})