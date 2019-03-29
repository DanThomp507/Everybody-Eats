import React from "react";
import { withRouter } from "react-router-dom";

const AttendingUsers = props => {
  const { guestList } = props;
  return (
    <div className="list-container">
      {guestList &&
        guestList.map((guest, index) => (
          <div key={index} className="guest-container">
            <div className="guest-information">{guest.username}</div>
            <div className="guest-buttons-container">
              <button
                className="guest-button"
                onClick={() => props.history.push(`/user/${guest.id}/username/${guest.username}`)}
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};
export default withRouter(AttendingUsers);
