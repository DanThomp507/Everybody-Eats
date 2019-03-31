import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";
import {
  fetchEvent,
  fetchEventUsers,
} from "../services/events";
import {joinEvent} from "../services/users";
import AttendingUsers from "./AttendingUsers";
import Moment from 'moment';

class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventData: {},
      guestList: []
    };
  }
  async componentDidMount() {
	    const eventData = await fetchEvent(this.props.match.params.event_id);
      const guestList = await fetchEventUsers(this.props.match.params.event_id);
	    this.setState({
	      eventData,
        guestList
	    })
	  }
 render() {
	    return(
	      <>
	      <h1>{this.state.eventData.event_name}</h1>
        <h2>{this.state.eventData.event_location}</h2>
        <h2>{Moment(this.state.eventData.event_date).format("LLL")}</h2>
        <h2>{this.state.eventData.event_details}</h2>
        <button onClick={async (e) => {
            e.preventDefault()
            console.log('clicked');
            await joinEvent(this.props.userData.id, this.props.match.params.event_id)
          }}>Join Event</button>
        <h3>Confirmed Guests:</h3>
        <AttendingUsers
          guestList={this.state.guestList}
          />
	      </>
	    )
	  }
	}
export default withRouter(EventPage)
