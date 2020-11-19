import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
import { useState } from 'react'

const FilterForm = () => {
    const dispatch = useDispatch()
    const [filterValue, setFilterValue] = new useState('')

    const handleChange = (event) => {
        dispatch(setFilter(event.target.value))
        setFilterValue(event.target.value)
    }

    return (
        <>
            filter <input type='text' value={filterValue} onChange={event => handleChange(event)}></input>
        </>
    )
}

export default FilterForm