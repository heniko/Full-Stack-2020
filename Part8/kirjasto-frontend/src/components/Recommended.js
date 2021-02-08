import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

import { ME, ALL_BOOKS } from '../queries'

const Recommended = ({ show }) => {
  const [favouriteGenre, setFavouriteGenre] = useState('')
  const [booksToShow, setBooksToShow] = useState([])
  const me = useQuery(ME)
  const books = useQuery(ALL_BOOKS, {
    variables: { genre: favouriteGenre },
    pollInterval:250,
    fetchPolicy:'cache-only'
  })

  useEffect(() => {
    if (!me.loading && me.data.me) {
      setFavouriteGenre(me.data.me.favouriteGenre)
    }
  }, [me.loading]) // eslint-disable-line

  useEffect(() => {
    if (!books.loading && books.data) {
      setBooksToShow(books.data.allBooks)
    }
  }, [books.loading, books.data, favouriteGenre]) // eslint-disable-line

  if (!show) return null

  return (
    <div>
      <h2>Recommended</h2>
      <p>Books in your favourite genre: <strong>{favouriteGenre}</strong></p>
      {booksToShow.length > 0 ?
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
        :
        <></>
      }
    </div>
  )
}

export default Recommended
