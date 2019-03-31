import React from "react";
import { withRouter } from "react-router-dom";
import EventsList from "./EventsList";

const UserProfile = props => {
  return (
    <div className="user-container">
      <h2>{props.currentUser.username}</h2>
      <p>Email: {props.currentUser.email}</p>
      <div className="eventsList-container">
        <nav className='sidebar-nav'>
          <ul>
            <li>
              <button
                className="edit-button"
                id='edit-user'
                onClick={() =>
                  props.history.push(
                    `/user/${props.match.params.user_id}/edit/`
                    )
                  }>Edit User
              </button>
            </li>
            <li id='test'></li>
            <li>
              <button
                className="edit-button"
                id='create-event'
                onClick={() =>
                  props.history.push(
                    `/events/${props.match.params.user_id}/new/`
                    )
                  }>Create Event
              </button>
            </li>
          </ul>
        </nav>
        <div>
          <h2>Attending:</h2>
          <EventsList
            host={false}
            eventsList={props.eventsList.filter((event) => {
              return props.match.params.user_id != event.host_id
            } )}
          />
        </div>
        <div>
          <h2>Hosting:</h2>
          <EventsList
            host={true}
            eventsList={props.eventsList.filter((event) => {
              return props.match.params.user_id == event.host_id
            } )}
          />
        </div>
      </div>
    </div>
  );
}
export default withRouter(UserProfile);
