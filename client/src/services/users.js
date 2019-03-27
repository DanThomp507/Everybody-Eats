const { api, updateToken } = require('./api_helper');
const BASE_URL = "http://localhost:9000";

const createNewUser = async user => {
  console.log(createNewUser)
  const respData = await api.post(`${BASE_URL}/users/register`, user);
  console.log("this is create user: resp", respData);
  return respData;
};
const editUser = async (id, edits) => {
  console.log("making an edit request with this data", edits);
  const respData = await api.put(`/users/${id}/edit`, edits);
  console.log("this is edit user: resp", respData);
  return respData;
};
const loginUser = async user => {
  const respData = await api.post(`${BASE_URL}/users/login`, user);
  console.log("this is login user: resp", respData);
  return respData;
};
const createNewEvent = async (ev, user_id) => {
  const respData = await api.post(`${BASE_URL}/events/${user_id}/new`, ev);
  console.log("this is create event: resp", respData);
  return respData;
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

export {
  createNewUser,
  editUser,
  loginUser,
  createNewEvent,
  fetchAllEvents
}
