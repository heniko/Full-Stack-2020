import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Books = ({ show, books }) => {
  const [genre, setGenre] = useState('')
  const { data, loading, refetch } = useQuery(ALL_BOOKS, {
    variables: { genre: genre },
    fetchPolicy: 'no-cache'
  })
  const [booksToShow, setBooksToShow] = useState([])

  useEffect(() => {
    if (!loading && data) {
      setBooksToShow(data.allBooks)
    }
  }, [data, loading]) // eslint-disable-line

  useEffect(() => {
    if(show) {
      refetch()
    }
  }, [show]) // eslint-disable-line

  if (!show) {
    return null
  }

  if (books.loading) {
    return null
  }

  const changeGenre = (genre) => {
    setGenre(genre)
    refetch()
  }

  const reducer = (accumulator, currentValue) => accumulator.concat(currentValue)
  const unique = (value, index, self) => self.indexOf(value) === index
  const allGenres = books.data.allBooks
    .map(book => book.genres)
    .reduce(reducer, [])
    .filter(unique)

  const genreButtons = () => {
    return (
      <div>
        <button onClick={() => changeGenre('')}>all genres</button>
        {allGenres.map(genre => <button key={genre} onClick={() => changeGenre(genre)}>{genre}</button>)}
      </div>
    )
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksToShow.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genreButtons()}
    </div>
  )
}

export default Books