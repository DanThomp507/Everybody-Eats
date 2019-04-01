import React, { Component } from "react";
import PlacesAutocomplete from 'react-places-autocomplete';
import {GoogleApiWrapper} from "google-maps-react";

const EventLocationField = props => {
  const {
    event_location,
    handleChange,
    handleSelect,
    handleFieldSubmit,
  } = props
  return(
    <div>
      <PlacesAutocomplete
      value={event_location}
      onChange={handleChange}
      onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="event-name">
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
      <button className="autoComplete-button" type="submit" onClick={e => handleFieldSubmit(e)}>next</button>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY,
})(EventLocationField)
