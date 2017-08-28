import * as actionTypes from '../actions/actionTypes'

export default function mainReducer(
	state = { 
				siteListIsLoading:false, 
				siteListLoadingError:false, 
				sites:[]
			}, 
	action) {

		switch (action.type) {

			case actionTypes.SITES_LIST_LOADING:
			
				return Object.assign({}, state, {siteListIsLoading: action.payload });

			case actionTypes.SITES_LIST_RESPONSE:

				if(action.error)
					return Object.assign({}, state, {siteListLoadingError: true, siteListIsLoading: false, sites:[] });
				else
					return Object.assign({}, state, {siteListLoadingError: false, siteListIsLoading: false, sites: action.payload });

			default:
				return state;
		}
}

