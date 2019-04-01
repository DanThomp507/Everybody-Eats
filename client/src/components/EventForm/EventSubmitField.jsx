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
        <p>{eventData.event_name}</p>
        <p>{eventData.event_location}</p>
        <p>{eventData.event_date}</p>
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
