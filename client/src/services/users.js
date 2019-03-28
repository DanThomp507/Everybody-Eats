const { api, updateToken } = require('./api_helper');

const verifyToken = async () => {
  const token = localStorage.getItem('authToken');
  if (token == null) {
    return false;
  } else {
    try {
      const res = await api.get('/users/verify', {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      updateToken(token);
      return res.data;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

const createNewUser = async user => {
  const respData = await api.post(`/users/register`, user);
  updateToken(respData.data.token);
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
  updateToken(respData.data.token);
  console.log("this is login user: resp", respData);
  return respData.data;
};

const fetchUserEvents = async user => {
  const respData = await api.get(`users/${user}/events`)
  return respData.data;
}
const joinEvent = async (user_id, event_id) => {
  debugger
  const respData = await api.post(`/events/#{event_id}/user/#{user_id}/add`);
  return respData.data;
};

export {
  createNewUser,
  editUser,
  loginUser,
  fetchUserEvents,
  verifyToken,
  joinEvent
}
