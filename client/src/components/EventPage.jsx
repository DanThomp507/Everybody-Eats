import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";
import {
  fetchEvent,
  fetchEventUsers,
} from "../services/events";
import EventsList from './EventsList';

class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventData: {}
    };
  }
  async componentDidMount() {
	    const eventData = await fetchEvent(this.props.match.params.event_id);
	    this.setState({
	      eventData
	    })
	  }
	  render() {
	    return(
	      <>
	      <h1>{this.state.eventData.event_name}</h1>
         <h2>{this.state.eventData.event_location}</h2>
          <h2>{this.state.eventData.event_date}</h2>
           <h2>{this.state.eventData.event_details}</h2>

           <h3>Confirmed Guests:</h3>
	      </>
	    )
	  }
	}
export default withRouter(EventPage)
