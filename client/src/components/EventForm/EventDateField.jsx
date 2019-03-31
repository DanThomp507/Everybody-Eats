import React from 'react'

const EventDateField = props => {
  const {
    event_date,
    handleEventFormChange,
  } = props
  return (
    <div>
      <label htmlFor="event_date">
        Event Date
      </label>
      <input
        type="datetime-local"
        name="event_date"
        value={event_date}
        id="event_date"
        onChange={handleEventFormChange}
      />
    </div>
  )
}

export default EventDateField
