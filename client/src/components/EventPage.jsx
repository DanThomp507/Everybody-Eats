import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";
import {
  fetchEvent,
  fetchEventUsers,
} from "../services/events";
import {
  joinEvent,
  backoutEvent
} from "../services/users";
import AttendingUsers from "./AttendingUsers";
import Moment from 'moment';

class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventData: {},
      guestList: [],
      attending: false
    };
  }

  async isAttending() {
    const guestList = await fetchEventUsers(this.props.match.params.event_id);
    guestList.map(guest => {
      if (this.props.userData.id == guest.id) {
        this.setState((prevState, newState) => ({
          attending: true,
          guestList
        }))
      } else {
        this.setState((prevState, newState) => ({
          attending: false,
          guestList
        }))
      }
    })
  }

  async componentDidMount() {
	    const eventData = await fetchEvent(this.props.match.params.event_id);
      const guestList = await fetchEventUsers(this.props.match.params.event_id);
      this.isAttending()
	    this.setState({
	      eventData,
        guestList
	    })
	  }
 render() {
	    return(
        <>
        <h1 className="event-title">{this.state.eventData.event_name}</h1>
        <div className='event-page'>
          <div className="event-info">
            <h2>{this.state.eventData.event_location}</h2>
            <h2>{Moment(this.state.eventData.event_date).format("LLL")}</h2>
            <h2>{this.state.eventData.event_details}</h2>
          </div>
          {
            (this.props.userData.id == this.state.eventData.host_id)?
            <></>
            :
              this.state.attending?
                <button className="join-backout-button" onClick={async (e) => {
                  e.preventDefault()
                  await backoutEvent(this.props.userData.id, this.props.match.params.event_id)
                  await this.isAttending()
                }}>Backout</button>
              :
                <button className="join-backout-button" onClick={async (e) => {
                  e.preventDefault()
                  await joinEvent(this.props.userData.id, this.props.match.params.event_id)
                  await this.isAttending()
                }}>Join Event</button>
          }
          <div className="attending-list">
            <h3>Confirmed Guests:</h3>
            <AttendingUsers
              guestList={this.state.guestList}
            />
          </div>
      </div>
        </>
	    )
	  }
	}
export default withRouter(EventPage)
