import React from "react";
import { withRouter } from "react-router-dom";

const UserProfile = props => {
  return (
    <div className="user-container">
      <h2>{this.props.userData.username}</h2>
      <p>Email: {this.props.userData.email}</p>
      <button
        className="edit-button"
        onClick={() =>
          this.props.history.push(
            `/user/${this.props.match.params.id}/edit/`
            )
          }>Edit User
      </button>
      <h1>Attending:</h1>
      <EventsList
        className="station-list"
        eventList={this.props.eventsList}
      />
    </div>
    );
  }
}
export default withRouter(UserProfile);
