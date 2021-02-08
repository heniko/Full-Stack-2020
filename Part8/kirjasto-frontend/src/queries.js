import { gql } from '@apollo/client'

export const AUTHOR_DETAILS = gql`
    fragment AuthorDetails on Author {
        name
        born
        id
        bookCount
    }
`

export const BOOK_DETAILS = gql`
    fragment BookDetails on Book {
        title
        author {
            ...AuthorDetails
        }
        genres
        published
        id
    }
    ${AUTHOR_DETAILS}
`

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            ...AuthorDetails
        }
    }
    ${AUTHOR_DETAILS}
`

export const ALL_BOOKS = gql`
    query ($author:String, $genre:String){
        allBooks(author:$author, genre:$genre) {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`

export const ADD_BOOK = gql`
    mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(
            title: $title
            author: $author
            published: $published
            genres: $genres
        ){
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`

export const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(
            name:$name
            setBornTo:$setBornTo
        ){
            ...AuthorDetails
        }
    }
    ${AUTHOR_DETAILS}
`

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(
            username:$username
            password:$password
        ){
            value
        }
    }
`

export const CREATE_USER = gql`
    mutation createUser($username: String!, $favouriteGenre: String) {
        createUser(
            username:$username
            favouriteGenre:$favouriteGenre
        ){
            username
            favouriteGenre
            id
        }
    }
`

export const ME = gql`
    query {
        me {
            username
            favouriteGenre
            id
        }
    } 
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS}
`