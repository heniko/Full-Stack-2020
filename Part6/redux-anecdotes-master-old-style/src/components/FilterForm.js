import React from 'react'
import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
import { useState } from 'react'

const FilterForm = (props) => {
    const [filterValue, setFilterValue] = new useState('')

    const handleChange = (event) => {
        props.setFilter(event.target.value)
        setFilterValue(event.target.value)
    }

    return (
        <>
            filter <input type='text' value={filterValue} onChange={event => handleChange(event)}></input>
        </>
    )
}

const mapDispatchToProps = {
    setFilter
}

export default connect(null, mapDispatchToProps)(FilterForm)