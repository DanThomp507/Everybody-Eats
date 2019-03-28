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
  async getEventData() {
    const eventData = await fetchEvent(this.props.match.params.id);
    const eventUsers = await fetchEventUsers(this.props.match.params.id);
  }
}
export default EventPage
