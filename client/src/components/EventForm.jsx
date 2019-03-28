import React, { Component } from "react";
import { createNewEvent } from '../services/events'
import { withRouter, Link } from "react-router-dom";

class EventForm extends Component {
  constructor() {
    super();
    this.state = {
      eventData: {
        event_name: '',
        event_location: '',
        event_date: '',
        event_details: ''
      }
    };
    this.handleEventFormChange = this.handleEventFormChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}

handleEventFormChange(e) {
  const { name, value } = e.target;
  this.setState(prevState => ({
    eventData: {
      ...prevState.eventData,
      [name]: value
    }
  }));
}
async handleSubmit(e){
  e.preventDefault();
  const resp = await createNewEvent(this.props.match.params.id, this.state.eventData);
  console.log(resp);
  this.setState(prevState => ({
    eventData: {
      ...prevState.eventData
    }
  }))
}

async componentDidMount() {
  this.setState(prevState => ({
    eventData: {
      ...prevState.eventData
    }
  }));
}
  render() {
    return (
      <form className="event-form" onSubmit={this.handleSubmit}>
        <h2>Create an Event</h2>
        <label htmlFor="name">Event Name</label>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={this.event_name}
          id="event_name"
          onChange={this.handleEventFormChange}
        />
        <label htmlFor="location">Event Location</label>
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={this.event_location}
          id="location"
          onChange={this.handleEventFormChange}
        />
        <label htmlFor="event_date">
          Event Date
        </label>
        <input
          type="datetime-local"
          name="event_date"
          value={this.event_date}
          id="event_date"
          onChange={this.handleEventFormChange}
        />
        <label htmlFor="event_details">Event Details</label>
        <input
          type="text"
          name="event_details"
          placeholder="Additional Details"
          value={this.event_details}
          id="event_details"
          onChange={this.handleEventFormChange}
        />
        <button type="submit" onClick={this.handleSubmit}>
        Submit
        </button>
      </form>
    );
  }
}

export default withRouter(EventForm);
