import fetch from 'isomorphic-fetch';

const baseURL = '/api';

export const fetchAllFlags = () => (
  fetch(`${baseURL}/allflags`)
    .then(response => response.json)
    .catch(error => error)
);

export const fetchFlag = id => (
  fetch(`${baseURL}/flag/${id}`)
  .then(response => response.json)
  .catch(error => error)
);

export const newFlag = data => (
  fetch(`${baseURL}/flag`, {
    method: 'POST',
    body: JSON.stringify(data)
  })
  .then(response => response.json)
  .catch(error => error)
);

export const updateFlag = (data, id) => (
  fetch(`${baseURL}/flag/${id}`, {
    method: 'UPDATE',
    body: JSON.stringify(data)
  })
  .then(response => response.json)
  .catch(error => error)
);

export const deleteFlag = id => (
  fetch(`${baseURL}/flag/${id}`, {
    method: 'DELETE'
  })
  .then(response => response.json)
  .catch(error => error)
);
