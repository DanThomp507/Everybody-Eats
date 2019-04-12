import React from 'react'

const EventDateField = props => {
  const {
    event_date,
    handleEventFormChange,
    handleFieldSubmit,
  } = props
  return (
    <div className="event-name">
      <input
        type="datetime-local"
        name="event_date"
        value={event_date}
        id="event_date"
        onChange={handleEventFormChange}
      />
      <button type="submit" onClick={e => handleFieldSubmit(e)}>next</button>
    </div>
  )
}

export default EventDateField
