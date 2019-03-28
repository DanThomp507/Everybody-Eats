const { api, updateToken } = require('./api_helper');

const createNewUser = async user => {
  const respData = await api.post(`/users/register`, user);
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
  const respData = await api.post(`/users/login`, user);
  updateToken(respData.data.token)
  console.log("this is login user: resp", respData);
  return respData.data;
};
const fetchEventUsers = async (user_id, event_id) => {
  const respData = await api.get(`/${user_id}/events/${event_id}/`);
  return respData.data;
};
const fetchUserEvents = async user => {
  const respData = await api.get(`users/${user}/events`)
  return respData.data;
}

export {
  createNewUser,
  editUser,
  loginUser,
  fetchEventUsers,
  fetchUserEvents
}
