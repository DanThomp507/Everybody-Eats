import React from "react";
import { withRouter } from "react-router-dom";
import EventsList from "./EventsList";

const UserProfile = props => {
  return (
    <div className="user-container">
      <div className='title-container'>
        <h2>{props.currentUser.username}</h2>
        <p>Email: {props.currentUser.email}</p>
      </div>
      <div className="eventsList-container">
        <nav className='sidebar-nav'>
              <button
                className="edit-button"
                id='edit-user'
                onClick={() =>
                  props.history.push(
                    `/user/${props.match.params.user_id}/edit/`
                    )
                  }>Edit User
              </button>
              <button
                className="edit-button"
                id='create-event'
                onClick={() =>
                  props.history.push(
                    `/events/${props.match.params.user_id}/new/`
                    )
                  }>Create Event
              </button>
        </nav>

        {
          props.showList?
            <div className='attending-hosting'>
              <h2>Attending:</h2>
              <EventsList
                host={false}
                eventsList={props.eventsList.filter((event) => {
                  return props.match.params.user_id != event.host_id
                } )}
              />
            </div>
            :
            <div className='attending-hosting'>
              <h2>Hosting:</h2>
              <EventsList
                host={true}
                eventsList={props.eventsList.filter((event) => {
                  return props.match.params.user_id == event.host_id
                } )}
              />
            </div>
        }
        <div className="sidebar-nav">
          <button
            className="attending-button"
            onClick={() => {
              props.changeList('attending')
              }
            }
          >
          Attending
          </button>
          <button
            className="hosting-button"
            onClick={() => {
              props.changeList('hosting')
              }
            }
          >
          Hosting
          </button>
        </div>
      </div>
    </div>
  );
}
export default withRouter(UserProfile);
