import React from "react";
import { withRouter } from "react-router-dom";
import {CopyToClipboard} from 'react-copy-to-clipboard';

const EventsList = props => {
  const { eventsList } = props;
  console.log("EVENTSLIST : eventsList:", eventsList);
  return (
    <div className="events-list-container">
      {eventsList &&
        eventsList.map((event, index) => (

          <div key={index} className="event-container">
            <div className="event-information">{event.event_name}</div>
            {props.host && (
              <>
                <div className="event-link">Click Link to Copy</div>
                <CopyToClipboard text={`http://everybodyeats.surge.sh/events/${event.id}`}>
                    <button className="copy-link">{`http://everybodyeats.surge.sh/events/${event.id}`}</button>
                </CopyToClipboard>
              </>
            )}
            <div className="event-buttons-container">
              <button
                className="event-button"
                onClick={() => props.history.push(`/events/${event.id}`)}
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
