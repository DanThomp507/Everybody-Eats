import React from 'react'
import { withRouter } from "react-router-dom";
const EventSubmitField = props => {
  const {
    eventData,
    handleSubmit,
    history,
    currentUser,
  } = props
  return (
    <div>
      <div>
        <h3>Event Name:</h3>
        <p>{eventData.event_name}</p>
        <h3>Event Location:</h3>
        <p>{eventData.event_location}</p>
        <h3>Event Date and Time:</h3>
        <p>{eventData.event_date}</p>
        <h3>Event Details:</h3>
        <p>{eventData.event_details}</p>
      </div>
      <button type="submit" onClick={(e) => {
        handleSubmit(e)
        history.push(
          `/user/${currentUser.id}/username/${currentUser.username}`
        )
      }}>
        Submit
      </button>
    </div>
  )
}

export default withRouter(EventSubmitField)
