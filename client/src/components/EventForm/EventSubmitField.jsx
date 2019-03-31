import React from 'react'
import { withRouter } from "react-router-dom";
const EventSubmitField = props => {
  const {
    handleSubmit,
    history,
    currentUser,
  } = props
  console.log("event submit field", currentUser);
  return (
    <button type="submit" onClick={(e) => {
      handleSubmit(e)
      history.push(
        `/user/${currentUser.id}/username/${currentUser.username}`
      )
    }}>
      Submit
    </button>
  )
}

export default withRouter(EventSubmitField)
