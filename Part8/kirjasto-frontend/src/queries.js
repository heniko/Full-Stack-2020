import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name
            born
            id
            bookCount
        }
    }
`

export const ALL_BOOKS = gql`
    query ($author:String, $genre:String){
        allBooks(author:$author, genre:$genre) {
            title
            author{
                name
                born
                bookCount
                id
            }
            genres
            published
            id
        }
    }
`

export const ADD_BOOK = gql`
    mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
        addBook(
            title: $title
            author: $author
            published: $published
            genres: $genres
        ){
            title
            author{
                name
                born
                bookCount
                id
            }
            published
            genres
            id
        }
    }
`

export const EDIT_AUTHOR = gql`
    mutation editAuthor($name: String!, $setBornTo: Int!) {
        editAuthor(
            name:$name
            setBornTo:$setBornTo
        ){
            name
            born
            bookCount
            id
        }
    }
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