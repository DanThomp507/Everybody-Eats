import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";
import {
  fetchAllEvents
} from "../services/users";

class StationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventData: ""
    };
  }
  async getEventData() {
    const eventData = await fetchEventData(this.props.match.params.id);
}
