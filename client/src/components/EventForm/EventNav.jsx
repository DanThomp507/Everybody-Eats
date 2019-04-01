import React from 'react'

const EventNav = props => {
  const { handleEventFieldSelect } = props
  return (
    <div className="event-nav">
      <button value={1} onClick={e => handleEventFieldSelect(e)}>Name</button>
      <button value={2} onClick={e => handleEventFieldSelect(e)}>Location</button>
      <button value={3} onClick={e => handleEventFieldSelect(e)}>Where & When</button>
      <button value={4} onClick={e => handleEventFieldSelect(e)}>Details</button>
      <button value={5} onClick={e => handleEventFieldSelect(e)}>Submit</button>
    </div>
  )
}

export default EventNav
