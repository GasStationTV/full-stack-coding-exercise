import fetch from 'isomorphic-fetch';

const baseURL = '/api';

export const fetchAllFlags = () => {
  return fetch(`${baseURL}/allflags`)
    .then(response => response.json())
    .then(flags => flags)
    .catch(error => error)
};

export const fetchFlag = id => (
  fetch(`${baseURL}/flag/${id}`)
  .then(response => response.json())
  .then(flag => flag)
  .catch(error => error)
);

export const newFlag = data => (
  fetch(`${baseURL}/flag`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({...data})
  })
  .then(response => response)
  .catch(error => error)
);

export const updateFlag = (data, id) => {
  return fetch(`${baseURL}/flag/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({...data})
  })
  .then(response => response)
  .catch(error => error)
};

export const deleteFlag = id => (
  fetch(`${baseURL}/flag/${id}`, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(id => id)
  .catch(error => error)
);
