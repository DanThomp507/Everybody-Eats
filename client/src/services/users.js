import axios from 'axios';
import { api, updateToken } from './api_helper';
const BASE_URL = "https://localhost:9000";

const createNewUser = async user => {
  const respData = await axios.post(`${BASE_URL}/users/register`, user);
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
  const respData = await axios.post(`${BASE_URL}/users/login`, user);
  console.log("this is login user: resp", respData);
  return respData;
};
const createNewEvent = async (ev, user_id) => {
  const respData = await axios.post(`${BASE_URL}/events/${user_id}/new`, ev);
  console.log("this is create event: resp", respData);
  return respData;
};
export {
  createNewUser,
  editUser,
  loginUser,
  createNewEvent
}
