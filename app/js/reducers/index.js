import { combineReducers } from 'redux'
import * as actionTypes from '../actions/actionTypes'

export default combineReducers({
  sitesListDetails,
  sitesArr
})

// This reducer is just concerned about details of the list of Sites. 
// For example, if the list is loading from the server, or which one of the ID's is currently selected.
function sitesListDetails (
	state = { 
				sitesListIsLoading:false, 
				sitesListLoadingError:false, 
				selectedSiteId:0
			}, 
	action) {

		switch (action.type) {

			case actionTypes.SITES_LIST_LOADING:

				if(typeof action.payload !== "boolean")
					throw new Error("Error in reducer for SITES_LIST_LOADING. action.payload should be Boolean");

				return Object.assign({}, state, {sitesListIsLoading: action.payload })

			case actionTypes.SELECT_SITE:

				if(action.payload.show)
					return Object.assign({}, state, {selectedSiteId: action.payload.siteId })
				else
					return Object.assign({}, state, {selectedSiteId: 0 })

			case actionTypes.SITES_LIST_RESPONSE:

				if(action.error)
					return Object.assign({}, state, {sitesListLoadingError: true, sitesListIsLoading: false })
				else
					return Object.assign({}, state, {sitesListLoadingError: false, sitesListIsLoading: false })

			default:
				return state
		}
}


// This reducer handles communication for individual Sites and will take care of merging any Site-specific data into the array.
function sitesArr (state = [], action) {

		switch (action.type) {

			case actionTypes.SITES_LIST_RESPONSE: {

				if(action.error){
					return []
				}
				else{

					if(!Array.isArray(action.payload))
						throw new Error("Error in sitesArr reducer. The action payload must be of type array.")
					
					return action.payload.concat()
				}
			}

			case actionTypes.SITE_DATA_LOADING: {

				const siteArrCopy = state.concat();
				const siteIdFromPayload = action.payload.siteId
				const siteObj = getSiteObjById(siteIdFromPayload, siteArrCopy)

				if(typeof action.payload.isLoading !== "boolean")
					throw new Error("Error in reducer for SITE_DATA_LOADING. action.payload.isLoading should be Boolean");

				siteObj.isLoading = action.payload.isLoading;

				if(!siteObj.isLoading)
					siteObj.isLoaded = false;

				siteArrCopy[getSiteIndexWithinStateArrayById(siteIdFromPayload, siteArrCopy)] = siteObj;

				return siteArrCopy;
			}

			case actionTypes.SITE_DATA_RESPONSE: {

				const siteArrCopy = state.concat();
				const siteIdFromPayload = action.payload.siteId
				const indexOfSiteInArr = getSiteIndexWithinStateArrayById(siteIdFromPayload, siteArrCopy);

				// If there's an error just use the existing record from the current state and set some flags on it.
				if(action.error){

					const existingSiteObjCopy = getSiteObjById(siteIdFromPayload, siteArrCopy);

					existingSiteObjCopy.isLoading = false;
					existingSiteObjCopy.isLoaded = false;
					existingSiteObjCopy.hasErrorLoading = true;

					siteArrCopy[indexOfSiteInArr] = existingSiteObjCopy;

					return siteArrCopy;
				}

				// Otherwise replace the existing Site object on the state array with the object returned from the REST call.
				const siteObjFromPayload = action.payload.siteObj

				if(siteIdFromPayload !== siteObjFromPayload._id)
					throw new Error("Error in SITE_DATA_RESPONSE reducer. The Payload Site ID does not match the _id key within the REST response.");

				siteObjFromPayload.isLoading = false;
				siteObjFromPayload.isLoaded = true;
				siteObjFromPayload.hasErrorLoading = false;

				siteArrCopy[indexOfSiteInArr] = siteObjFromPayload;

				return siteArrCopy;
			}
			default:
				return state
		}
}


const getSiteIndexWithinStateArrayById = (siteId, sitesArr) => {

	const foundIndex = sitesArr.findIndex(siteObj => siteObj._id === siteId)

	if(foundIndex === -1)
		throw new Error("Error in Reducer function getSiteIndexWithinStateArrayById. The given Site ID couldn't be found within the Site Array:" + siteId);

	return foundIndex;
}

const getSiteObjById = (siteId, sitesArr) => {

	const indexOfSite = getSiteIndexWithinStateArrayById(siteId, sitesArr);

	return Object.assign({}, sitesArr[indexOfSite]);
}

