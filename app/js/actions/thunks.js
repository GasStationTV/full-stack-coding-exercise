import {URL_SITES_LIST} from '../lib/constants.js'
import * as actionTypes from './actionTypes.js'

// Setup instructions from https://www.npmjs.com/package/fetch-everywhere
// Provides a pollyfill for "fetch" within global scope.
require('es6-promise').polyfill();
require('fetch-everywhere');


// The "sites list" calls a REST service which returns an array of Site ID's and Site Names (without any Site data).
export function fetchSitesList() {

	return (dispatch) => {

		dispatch(sitesListIsLoading(true));

		fetch(URL_SITES_LIST)
			.then((response) => {

				if (!response.ok)
					throw new Error("Error loading sites list: " + response.statusText)

				return response;
			})
			.then(response => response.json())
			.then(responseObj => dispatch(sitesListDataSuccess(responseObj)) )
			.catch(error => dispatch(sitesListDataError(error)))
	};
}

function sitesListIsLoading(bool) {

	return {
		type: actionTypes.SITES_LIST_LOADING,
		payload: bool
	}
}

function sitesListDataSuccess(sites) {

	return {
		type: actionTypes.SITES_LIST_RESPONSE,
		payload: sites,
		error: false
	}
}

function sitesListDataError(error) {

	console.log("Error fetching data for sites list:", error)

	return {
		type: actionTypes.SITES_LIST_RESPONSE,
		payload: error,
		error: true
	}
}


// The "site data" is comes from another REST call to populate the flags for a given Site ID.
export function fetchSiteData(siteId) {

	return (dispatch) => {

		dispatch(siteDataIsLoading(siteId, true));

		fetch(URL_SITES_LIST + "/" + siteId)
			.then((response) => {

				if (!response.ok)
					throw new Error(`Error loading site data for ID ${siteId}: ${response.statusText}`)

				return response;
			})
			.then(response => response.json())
			.then(responseObj => dispatch(siteDataSuccess(siteId, responseObj)))
			.catch(error => dispatch(siteDataError(siteId, error)))
	};
}

function siteDataIsLoading(siteId, isLoading) {

	return {
		type: actionTypes.SITE_DATA_LOADING,
		payload: { siteId, isLoading }
	}
}

function siteDataSuccess(siteId, siteObj) {

	return {
		type: actionTypes.SITE_DATA_RESPONSE,
		payload: { siteId, siteObj },
		error: false
	}
}

function siteDataError(siteId, error) {

	console && console.log && console.log("Error fetching data for site data:", error)

	return {
		type: actionTypes.SITE_DATA_RESPONSE,
		payload: { siteId, error },
		error: true
	}
}


// Saves the Site Data back to the server.
export function saveSiteData(siteId, siteObj) {

	if(!siteObj || !Array.isArray(siteObj.flags))
		throw new Error("Error with saveSiteData action creator. The given Site Object should contain an array of Flag objects.")

	return (dispatch) => {

		dispatch(siteDataIsSaving(siteId, true));

		fetch(URL_SITES_LIST + "/" + siteId, { 
				method: 'POST',
				body: JSON.stringify({
					flags: siteObj.flags
				})
			})
			.then((response) => {

				if (!response.ok)
					throw new Error(`Error loading site data for ID ${siteId}: ${response.statusText}`)

				return response
			})
			.then(response => dispatch(siteDataSaveSuccess(siteId, siteObj)))
			.catch(error => dispatch(siteDataSaveError(siteId, error)))
	};
}

function siteDataIsSaving(siteId, isSaving) {

	return {
		type: actionTypes.SITE_DATA_SAVE_SENDING,
		payload: { siteId, isSaving }
	}
}

function siteDataSaveSuccess(siteId, siteObj) {

	return {
		type: actionTypes.SITE_DATA_SAVE_RESPONSE,
		payload: { siteId, siteObj },
		error: false
	}
}

// Normally the Payload should be an Error object for Flux Standard Actions.
// However for this case it's necessary to know the SiteID which failed within the dispatch.
// In case of an error the Payload will contain the Error object on a sub-key.
function siteDataSaveError(siteId, error) {

	console && console.log && console.log("Error fetching data for site data:", error)

	return {
		type: actionTypes.SITE_DATA_SAVE_RESPONSE,
		payload: { siteId, error },
		error: true
	}
}
