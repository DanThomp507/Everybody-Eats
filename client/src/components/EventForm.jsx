import React, { Component } from "react";
import { createNewEvent } from '../services/events'
import { joinEvent } from '../services/users'
import { withRouter, Link } from "react-router-dom";
import PlacesAutocomplete from 'react-places-autocomplete';
import {GoogleApiWrapper} from "google-maps-react";

class EventForm extends Component {
  constructor() {
    super();
    this.state = {
        eventData: {
        event_name: '',
        event_location: '',
        event_date: '',
        event_details: ''
      },
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
  const resp = await createNewEvent(this.state.eventData);
  await joinEvent(this.props.match.params.user_id, resp.id);
  this.props.updateUserEvents()
  this.setState(prevState => ({
    eventData: {
      ...prevState.eventData
    }
  }))
}

handleChange = (address) => {
  this.setState(prevState => ({
    eventData: {
      ...prevState.eventData,
      event_location: address
    }
  }));
};

handleSelect = (address) => {
  this.setState(prevState => ({
    eventData: {
      ...prevState.eventData,
      event_location: address
    }
  }));
};

async componentDidMount() {
  this.setState(prevState => ({
    eventData: {
      ...prevState.eventData,
      host_id: this.props.match.params.id
    }
  }));
}
  render() {
    return (
      <form className="event-form">
        <h2>Create an Event</h2>
        <label htmlFor="name">Event Name</label>
        <input
          type="text"
          placeholder="Name"
          name="event_name"
          value={this.event_name}
          id="event_name"
          onChange={this.handleEventFormChange}
        />
        <label htmlFor="location">Event Location</label>
          <PlacesAutocomplete
            value={this.state.eventData.event_location}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div className='input-and-auto'>
                <input
                  {...getInputProps({
                    name: "event_location",
                    placeholder: 'Where to?',
                    className: 'location-search-input',
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className=suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
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
      <button type="submit" onClick={(e) => {
        this.handleSubmit(e)
        this.props.history.push(
          `/user/${this.props.currentUser.id}/username/${this.props.currentUser.username}`
        )
      }}>
        Submit
      </button>
      </form>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY,
})(withRouter(EventForm));
