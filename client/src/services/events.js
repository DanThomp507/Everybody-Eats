const { api } = require('./api_helper');
const BASE_URL = "http://localhost:9000";

const createNewEvent = async (ev, user_id) => {
  const respData = await api.post(`/events/${user_id}/new`, ev);
  console.log("this is create event: resp", respData);
  return respData.data;
};
const fetchAllEvents = async () => {
  const respData = await api.get(`/events`);
  return respData;
};
const fetchEvent = async ev => {
  const respData = await api.get(`/events/${ev}`);
  return respData.data;
};

export {
  createNewEvent,
  fetchAllEvents,
  fetchEvent,
}
