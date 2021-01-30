import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'

import { EDIT_AUTHOR } from '../queries'

const Authors = ({ show, authors }) => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR)

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name: name.value, setBornTo: parseInt(born, 10) } })

    setBorn('')
  }

  if (!show || authors.loading) {
    return null
  }

  const options = authors.data.allAuthors.map(author => {
    return {value: author.name, label:author.name}
  })

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <form onSubmit={submit}>
        <div>
          <Select 
            defaultValue={name}
            onChange={setName}
            options={options}
          />
        </div>
        <div>
          born <input type='number' value={born} onChange={({ target }) => setBorn(target.value)}>
          </input>
        </div>
        <button type='submit'>Change born</button>
      </form>
    </div>
  )
}

export default Authors
