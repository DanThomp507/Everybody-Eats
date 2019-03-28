const { api, updateToken } = require('./api_helper');
const BASE_URL = "http://localhost:9000";

const createNewUser = async user => {
  console.log(createNewUser)
  const respData = await api.post(`${BASE_URL}/users/register`, user);
  console.log("this is create user: resp", respData);
  return respData.data;
};
const editUser = async (id, edits) => {
  console.log("making an edit request with this data", edits);
  const respData = await api.put(`/users/${id}/edit`, edits);
  console.log("this is edit user: resp", respData);
  return respData.data;
};
const loginUser = async user => {
  const respData = await api.post(`${BASE_URL}/users/login`, user);
  updateToken(respData.data.token)
  console.log("this is login user: resp", respData);
  return respData.data;
};
const createNewEvent = async (ev) => {
  const respData = await api.post(`${BASE_URL}/events/`, ev);
  console.log("this is create event: resp", respData);
  return respData.data;
};
const fetchAllEvents = async () => {
  const respData = await api.get(`/events`);
  return respData;
};
const fetchEventData = async ev => {
  console.log("this is fetchStationData station", ev);
  const respData = await api.get(`/events/${ev}`);
  return respData.data;
};
const fetchEventUsers = async (user_id, event_id) => {
  const respData = await api.get(`/${user_id}/events/${event_id}/`);
  return respData.data;
};

export {
  createNewUser,
  editUser,
  loginUser,
  createNewEvent,
  fetchAllEvents,
  fetchEventData,
  fetchEventUsers,
}
