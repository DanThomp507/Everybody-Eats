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

class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventData: {},
      guestList: [],
      attending: false
    };
  }

  isAttending() {
    this.state.guestList.map(guest => {
      if (this.props.userData.id == guest.id) {
        this.setState((prevState, newState) => ({
          attending: true
        }))
      } else {
        this.setState((prevState, newState) => ({
          attending: false
        }))
      }
    })
  }

  async addUser() {
    const guestList = await fetchEventUsers(this.props.match.params.event_id);
    this.setState({
      guestList
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
	      <h1>{this.state.eventData.event_name}</h1>
        <h2>{this.state.eventData.event_location}</h2>
        <h2>{this.state.eventData.event_date}</h2>
        <h2>{this.state.eventData.event_details}</h2>
        {
          (this.props.userData.id == this.state.eventData.host_id)?
          <></>
          :
            this.state.attending?
              <button onClick={async (e) => {
                e.preventDefault()
                await backoutEvent(this.props.userData.id, this.props.match.params.event_id)
                await this.addUser()
                this.isAttending()
              }}>Backout</button>
            :
              <button onClick={async (e) => {
                e.preventDefault()
                await joinEvent(this.props.userData.id, this.props.match.params.event_id)
                await this.addUser()
                this.isAttending()
              }}>Join Event</button>
        }
        <h3>Confirmed Guests:</h3>
        <AttendingUsers
          guestList={this.state.guestList}
          />
	      </>
	    )
	  }
	}
export default withRouter(EventPage)
