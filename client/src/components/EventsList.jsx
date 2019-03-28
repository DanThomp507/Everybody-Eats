import React from "react";
import { withRouter } from "react-router-dom";

const EventsList = props => {
  const { eventsList } = props;
  console.log("EVENTSLIST : eventsList:", eventsList);
  return (
    <div className="events-list-container">
      {eventsList &&
        eventsList.map((event, index) => (
          <div key={index} className="event-container">
            <div className="event-information">{event.event_name}</div>
            <div className="event-buttons-container">
              <button
                className="event-button"
                onClick={() =>
                  props.history.push(`/events/${event.event_id}`)}
              >
                View Event
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};
export default withRouter(EventsList);