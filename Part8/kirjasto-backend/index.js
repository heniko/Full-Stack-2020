const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { v1: uuid } = require('uuid')

const Author = require('./models/author')
const Book = require('./models/book')

const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoserver = new MongoMemoryServer()

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

  type Query {
      authorCount: Int!
      bookCount: Int!
      allBooks(author:String, genre:String): [Book!]!
      allAuthors: [Author!]!
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
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name })
      const books = await Book.find({ author: author.id })
      return books.length
    }
  },
  Mutation: {
    addBook: async (root, args) => {
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
    editAuthor: async (root, args) => {
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
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})