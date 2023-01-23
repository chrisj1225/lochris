import axios from 'axios';

export const getAllRsvps = () => {
  return axios.get('/api/rsvps/');
}

export const getUserRsvp = (userId) => {
  return axios.get(`/api/rsvps/user/${userId}`);
}

export const getRsvp = (rsvpId) => {
  return axios.get(`/api/rsvps/${rsvpId}`);
}

export const createRsvp = (data) => {
  return axios.post('/api/rsvps/', data);
}

// class rsvpApi {

//   static  createRsvp(data) {
//     let url = `/api/rsvps/`
    
//     return fetch(url, {
//       method: 'POST',
//       body: JSON.stringify(data),
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         'X-Available-Messages': 1
//       }
//     }).then((r) => r.json().then(data => ({ status: r.status, ok: r.ok, data })));
//   }

// }

// export default rsvpApi;