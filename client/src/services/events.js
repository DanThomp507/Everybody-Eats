const { api } = require('./api_helper');
const BASE_URL = "http://localhost:9000";

const createNewEvent = async event => {
  const respData = await api.post(`/events`, event);
  console.log("this is create event: resp", respData);
  return respData.data;
};
const fetchAllEvents = async () => {
  const respData = await api.get(`/events`);
  return respData;
};
const fetchEvent = async event_id => {
  const respData = await api.get(`/events/${event_id}`);
  return respData.data;
};
const fetchEventUsers = async event_id => {
  const respData = await api.get(`/events/${event_id}/guests`);
  return respData.data;
};
export {
  createNewEvent,
  fetchAllEvents,
  fetchEvent,
  fetchEventUsers
}
