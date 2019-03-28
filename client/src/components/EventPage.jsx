import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";
import {
  fetchEvent,
  fetchEventUsers
} from "../services/events";


class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventData: "",
      eventUsers: []
    };
  }
  async componentDidMount() {
    const eventData = await fetchEvent(this.props.match.params.event_id);
    const eventUsers = await fetchEventUsers(this.props.match.params.event_id);
    this.setState({
      eventData,
      eventUsers
    })
  }
  render() {
    return(
      <>
      {this.state.eventData.event_name}
      </>
    )
  }
}
export default withRouter(EventPage)
