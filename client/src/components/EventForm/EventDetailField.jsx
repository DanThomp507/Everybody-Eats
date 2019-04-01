import React from 'react'

const EventDetailField = props => {
  const {
    event_details,
    handleEventFormChange,
  } = props

  return (
    <div className="event-name">
      <label htmlFor="event_details">Event Details</label>
      <input
        type="text"
        name="event_details"
        placeholder="Additional Details"
        value={event_details}
        id="event_details"
        onChange={handleEventFormChange}
      />
    </div>
  )
}

export default EventDetailField
