import React, { Component } from "react";
import { createNewEvent } from '../../services/events'
import { joinEvent } from '../../services/users'
import { withRouter, Link } from "react-router-dom";
import PlacesAutocomplete from 'react-places-autocomplete';
import {GoogleApiWrapper} from "google-maps-react";
import EventNameField from './EventNameField'
import EventLocationField from './EventLocationField'
import EventDateField from './EventDateField'
import EventDetailField from './EventDetailField'
import EventSubmitField from './EventSubmitField'
import EventNav from './EventNav'

class EventForm extends Component {
  constructor() {
    super();
    this.state = {
      field: 1,
      eventData: {
        event_name: '',
        event_location: '',
        event_date: '',
        event_details: '',
        host_id: '',
      },
    };
    this.handleEventFormChange = this.handleEventFormChange.bind(this);
    this.handleEventFieldSelect = this.handleEventFieldSelect.bind(this);
    this.handleFieldSubmit = this.handleFieldSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
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

  handleFieldSubmit(e) {
    e.preventDefault()
    this.setState(prevState => ({
      field: prevState.field + 1
    }))
  }

  handleEventFieldSelect(e) {
    e.preventDefault()
    const { value } = e.target
    const field = parseInt(value)
    this.setState({
      field
    })
  }

  async handleSubmit(e){
    e.preventDefault();
    console.log('handle field submit');
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
    console.log('url params:', this.props.match.params);
    this.setState(prevState => ({
      field: 1,
      eventData: {
        ...prevState.eventData,
        host_id: this.props.match.params.user_id
      }
    }));
  }

  render() {
    console.log(this.props);
    console.log(this.state);
    return (
      <>
      <h2 className="create-event-title">Create an Event</h2>
      <div className="event-form-container">
        <EventNav
          handleEventFieldSelect={this.handleEventFieldSelect}
        />
        <form className="event-form" onSubmit={this.handleFieldSubmit}>
          {this.state.field === 1 &&
            <EventNameField
              event_name={this.state.eventData.event_name}
              handleEventFormChange={this.handleEventFormChange}
            />
          }

          {this.state.field === 2 &&
            <EventLocationField
              event_location={this.state.eventData.event_location}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              handleFieldSubmit={this.handleFieldSubmit}
            />
          }

          {this.state.field === 3 &&
            <EventDateField
              event_date={this.state.eventData.event_date}
              handleEventFormChange={this.handleEventFormChange}
              handleFieldSubmit={this.handleFieldSubmit}
            />
          }

          {this.state.field === 4 &&
            <EventDetailField
              event_details = {this.state.eventData.event_details}
              handleEventFormChange = {this.handleEventFormChange}
            />
          }

          {this.state.field === 5 &&
            <EventSubmitField
              eventData={this.state.eventData}
              handleSubmit={this.handleSubmit}
              currentUser={this.props.currentUser}
            />
          }
        </form>
      </div>
      </>
    );
  }
}
export default withRouter(EventForm);
