import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification.message) {
    return (
      <></>
    )
  }

  const style = {
    color: notification.type === 'error' ? 'red' : 'green',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  return (
    <div style={style}>
      {notification.message}
    </div>
  )
}

export default Notification