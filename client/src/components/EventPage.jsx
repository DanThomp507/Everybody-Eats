import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";
import {
  fetchEventData,
  fetchEventUsers
} from "../services/users";


class EventPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventData: "",
      eventUsers: []
    };
  }
  async getEventData() {
    const eventData = await fetchEventData(this.props.match.params.id);
    const eventUsers = await fetchEventUsers(this.props.match.params.id);
  }
}
export default EventPage
