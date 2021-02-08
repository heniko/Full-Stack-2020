import React, { useState, useEffect } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'
import { ALL_AUTHORS, ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => {
      set.map(p => p.id).includes(object.id)
    }

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData.data.bookAdded)
      updateCacheWith(subscriptionData.data.bookAdded)
    }
  })

  useEffect(() => {
    const token = localStorage.getItem('kirjasto-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ?
          <>
            <button onClick={() => setPage('recommended')}>recommended</button>
            <button onClick={() => setPage('add')}>add book</button>
          </>
          :
          <></>
        }
        {token
          ?
          <button onClick={() => handleLogout()}>logout</button>
          :
          <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Recommended
        show={page === 'recommended'}
        books={books}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
      />

      <Authors
        show={page === 'authors'}
        authors={authors}
      />

      <Books
        show={page === 'books'}
        books={books}
      />

      <NewBook
        show={page === 'add'}
        cacheUpdater={updateCacheWith}
      />

    </div>
  )
}

export default App