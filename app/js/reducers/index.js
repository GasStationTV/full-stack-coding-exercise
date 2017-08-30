import { combineReducers } from 'redux'
import * as actionTypes from '../actions/actionTypes'
import cloneDeep from 'lodash.clonedeep'

export default combineReducers({
  sitesArr,
  sitesListDetails
})


// This reducer handles communication for individual Sites and will take care of merging any Site-specific data into the array.
function sitesArr (state = [], action) {

		switch (action.type) {

			case actionTypes.SITE_DATA_SAVE_SENDING: {

				const siteArrCopy = state.concat();
				const siteIdFromPayload = action.payload.siteId
				const siteObj = getSiteObjById(siteIdFromPayload, siteArrCopy)

				if(typeof action.payload.isSaving !== "boolean")
					throw new Error("Error in reducer for SITE_DATA_SAVE_SENDING. action.payload.isSaving should be Boolean")

				siteObj.isSaving = action.payload.isSaving

				siteArrCopy[getSiteIndexWithinStateArrayById(siteIdFromPayload, siteArrCopy)] = siteObj

				return siteArrCopy
			}

			case actionTypes.SITE_DATA_SAVE_RESPONSE: {

				const siteArrCopy = state.concat()
				const siteIdFromPayload = action.payload.siteId
				const siteObjectFromPayload = action.payload.siteObj
				const indexOfSiteInArr = getSiteIndexWithinStateArrayById(siteIdFromPayload, siteArrCopy)

				if(action.error){

					// Since there's an error, re-use the same Site object that's currently on the state (not the version sent to the server).
					siteArrCopy[indexOfSiteInArr] = getSiteObjById(siteIdFromPayload, siteArrCopy)

					// If there's an error, leave the form(s) open so that the user can try again.
					siteArrCopy[indexOfSiteInArr].hasErrorSaving = true

					// If there's an error saving to the server then the modal window needs to be closed in order to see the error message.
					siteArrCopy[indexOfSiteInArr].showConfirmDeleteForFlagIndex = undefined
				}
				else{

					// Since the update succeeded it is OK to add the new Site Object to the state.
					siteArrCopy[indexOfSiteInArr] = cloneDeep(siteObjectFromPayload)

					// Make sure to close the form since the update succeeded.
					// But don't take it down in case of an error or the user could lose data before re-submitting.
					siteArrCopy[indexOfSiteInArr].showAddFlagForm = false

					// It's important to errase any of the indexes because if a Flag Entry was deleted before calling the Save API, the existing indexes could be out of bounds.
					siteArrCopy[indexOfSiteInArr].showEditFormForFlagIndex = undefined
					siteArrCopy[indexOfSiteInArr].showConfirmDeleteForFlagIndex = undefined
				}

				// Whether an error happened or not, it's no longer saving.
				siteArrCopy[indexOfSiteInArr].isSaving = false

				return siteArrCopy
			}

			case actionTypes.UNSELECT_ACTIVE_SITE: {

				// Ran into a little problem here because it's not possible to quickly get the ID of the "selected Site" because of the ways that the reducers were separated.
				// It wouldn't be efficient in production, but one solution is to loop through all of the array elements an reset any Open/Edit flags.
				// The solution is either to normalize the data or add a Root Reducer.
				// Fow now, if you start to Edit or Add a Flag on a Site, the form will remain opened when you return.
				return state
			}

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

			case actionTypes.EDIT_FLAG: {

				const siteArrCopy = state.concat()
				const siteIdFromPayload = action.payload.siteId
				const siteObj = getSiteObjById(siteIdFromPayload, siteArrCopy)

				if(typeof action.payload.show !== "boolean")
					throw new Error("Error in reducer for EDIT_FLAG. action.payload.show should be Boolean.")

				if(typeof action.payload.flagIndex !== "number")
					throw new Error("Error in reducer for EDIT_FLAG. action.payload.flagIndex should be Number.")

				if(!siteObj.flags[action.payload.flagIndex])
					throw new Error("Error in reducer for EDIT_FLAG. The given flagIndex is out of bounds.")

				// If the Site Object stores a number on showEditFormForFlagIndex then it means that the Flag is in a state of being edited.
				if(action.payload.show)
					siteObj.showEditFormForFlagIndex = action.payload.flagIndex
				else
					siteObj.showEditFormForFlagIndex = undefined

				// If someone opens/closes an EDIT window then make sure to hide the ADD form.
				siteObj.showAddFlagForm = false

				siteArrCopy[getSiteIndexWithinStateArrayById(siteIdFromPayload, siteArrCopy)] = siteObj

				return siteArrCopy
			}
			case actionTypes.CONFIRM_DELETE_FLAG: {

				const siteArrCopy = state.concat()
				const siteIdFromPayload = action.payload.siteId
				const siteObj = getSiteObjById(siteIdFromPayload, siteArrCopy)

				if(typeof action.payload.show !== "boolean")
					throw new Error("Error in reducer for CONFIRM_DELETE_FLAG. action.payload.show should be Boolean.")

				if(typeof action.payload.flagIndex !== "number")
					throw new Error("Error in reducer for CONFIRM_DELETE_FLAG. action.payload.flagIndex should be Number.")

				if(!siteObj.flags[action.payload.flagIndex])
					throw new Error("Error in reducer for CONFIRM_DELETE_FLAG. The given flagIndex is out of bounds.")

				// If the Site Object stores a number on showConfirmDeleteForFlagIndex then it means that the Flag has a Delete Confirm modal opened.
				if(action.payload.show)
					siteObj.showConfirmDeleteForFlagIndex = action.payload.flagIndex
				else
					siteObj.showConfirmDeleteForFlagIndex = undefined

				siteArrCopy[getSiteIndexWithinStateArrayById(siteIdFromPayload, siteArrCopy)] = siteObj

				return siteArrCopy
			}

			case actionTypes.ADD_FLAG: {

				const siteArrCopy = state.concat()
				const siteIdFromPayload = action.payload.siteId
				const siteObj = getSiteObjById(siteIdFromPayload, siteArrCopy)

				if(typeof action.payload.show !== "boolean")
					throw new Error("Error in reducer for ADD_FLAG. action.payload.show should be Boolean")

				siteObj.showAddFlagForm = action.payload.show

				// If someone opens/closes the ADD form on a Site Object, close any EDIT form.
				siteObj.showEditFormForFlagIndex = undefined

				siteArrCopy[getSiteIndexWithinStateArrayById(siteIdFromPayload, siteArrCopy)] = siteObj

				return siteArrCopy
			}

			case actionTypes.SITE_DATA_LOADING: {

				const siteArrCopy = state.concat()
				const siteIdFromPayload = action.payload.siteId
				const siteObj = getSiteObjById(siteIdFromPayload, siteArrCopy)

				if(typeof action.payload.isLoading !== "boolean")
					throw new Error("Error in reducer for SITE_DATA_LOADING. action.payload.isLoading should be Boolean")

				siteObj.isLoading = action.payload.isLoading

				siteArrCopy[getSiteIndexWithinStateArrayById(siteIdFromPayload, siteArrCopy)] = siteObj

				return siteArrCopy
			}

			case actionTypes.SITE_DATA_RESPONSE: {

				const siteArrCopy = state.concat()
				const siteIdFromPayload = action.payload.siteId
				const indexOfSiteInArr = getSiteIndexWithinStateArrayById(siteIdFromPayload, siteArrCopy)

				// If there's an error just use the existing record from the current state and set some flags on it.
				if(action.error){

					const existingSiteObjCopy = getSiteObjById(siteIdFromPayload, siteArrCopy)

					existingSiteObjCopy.isLoading = false
					existingSiteObjCopy.isLoaded = false
					existingSiteObjCopy.hasErrorLoading = true

					siteArrCopy[indexOfSiteInArr] = existingSiteObjCopy

					return siteArrCopy
				}

				// Otherwise replace the existing Site object on the state array with the object returned from the REST call.
				const siteObjFromPayload = action.payload.siteObj

				if(siteIdFromPayload !== siteObjFromPayload._id)
					throw new Error("Error in SITE_DATA_RESPONSE reducer. The Payload Site ID does not match the _id key within the REST response.")

				siteObjFromPayload.isLoading = false
				siteObjFromPayload.isLoaded = true
				siteObjFromPayload.hasErrorLoading = false

				siteArrCopy[indexOfSiteInArr] = siteObjFromPayload

				return siteArrCopy
			}
			default:
				return state
		}
}

// This reducer is just concerned about details of the list of Sites. 
// For example, if the list is loading from the server, or which one of the ID's is currently selected.
function sitesListDetails (
	state = { 
				sitesListIsLoading:false, 
				sitesListLoadingError:false, 
				selectedSiteId:""
			}, 
	action) {

		switch (action.type) {

			case actionTypes.SITES_LIST_LOADING:

				if(typeof action.payload !== "boolean")
					throw new Error("Error in reducer for SITES_LIST_LOADING. action.payload should be Boolean")

				return Object.assign({}, state, {sitesListIsLoading: action.payload })

			case actionTypes.SELECT_SITE:

				if(action.payload.show)
					return Object.assign({}, state, {selectedSiteId: action.payload.siteId })
				else
					return Object.assign({}, state, {selectedSiteId: "" })

			case actionTypes.UNSELECT_ACTIVE_SITE:

				return Object.assign({}, state, {selectedSiteId: "" })

			case actionTypes.SITES_LIST_RESPONSE:

				if(action.error)
					return Object.assign({}, state, {sitesListLoadingError: true, sitesListIsLoading: false })
				else
					return Object.assign({}, state, {sitesListLoadingError: false, sitesListIsLoading: false })

			default:
				return state
		}
}



const getSiteIndexWithinStateArrayById = (siteId, sitesArr) => {

	const foundIndex = sitesArr.findIndex(siteObj => siteObj._id === siteId)

	if(foundIndex === -1)
		throw new Error("Error in Reducer function getSiteIndexWithinStateArrayById. The given Site ID couldn't be found within the Site Array:" + siteId)

	return foundIndex
}

const getSiteObjById = (siteId, sitesArr) => {

	const indexOfSite = getSiteIndexWithinStateArrayById(siteId, sitesArr)

	return cloneDeep(sitesArr[indexOfSite])
}

