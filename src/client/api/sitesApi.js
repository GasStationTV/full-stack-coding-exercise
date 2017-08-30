import fetch from 'isomorphic-fetch';

export function getAllSites() {
    return fetch('/api/site').then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
