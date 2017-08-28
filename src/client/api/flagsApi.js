import fetch from 'isomorphic-fetch';

export function createNewFlag(siteKey,startDate,endDate,flagType) {
    return fetch('/api/flag',{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          siteKey: siteKey,
          startDate: startDate,
          endDate:endDate,
          flagType:flagType
        })
      }
    ).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }

  export function updateExistingFlag(siteKey,flagIndex,startDate,endDate,flagType) {
      return fetch('/api/flag/'+siteKey+'/'+flagIndex,{
          method: 'PUT',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            startDate: startDate,
            endDate:endDate,
            flagType:flagType
          })
        }
      ).then(response => {
        return response.json();
      }).catch(error => {
        return error;
      });
    }

    export function removeExistingFlag(siteKey,flagIndex) {
        return fetch('/api/flag/'+siteKey+'/'+flagIndex,{
            method: 'DELETE',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          }
        ).then(response => {
          return response.json();
        }).catch(error => {
          return error;
        });
      }
