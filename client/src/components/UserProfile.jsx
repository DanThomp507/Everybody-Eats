import React from "react";
import { withRouter } from "react-router-dom";
import EventsList from "./EventsList";

const UserProfile = props => {
  return (
    <div className="user-container">
      <h2>{props.currentUser.username}</h2>
      <p>Email: {props.currentUser.email}</p>
      <button
        className="edit-button"
        onClick={() =>
          props.history.push(
            `/user/${props.match.params.id}/edit/`
            )
          }>Edit User
      </button>
      <button
        className="edit-button"
        onClick={() =>
          props.history.push(
            `/events/${props.match.params.id}/new/`
            )
          }>Create Event
      </button>
      <h2>Attending:</h2>
      <EventsList
        eventsList={props.eventsList}
      />
      <h2>Hosting:</h2>
      <EventsList
        eventsList={props.eventsList.filter((event) => {

          return props.match.params.user_id == event.host_id
        } )}
      />
    </div>
  );
}
export default withRouter(UserProfile);
