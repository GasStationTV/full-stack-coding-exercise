const intialflagsList=[
  "Advertiser - Location Priority"
  ,"Retailer - Location Priority"
  ,"Retailer - Showcase"
  ,"GSTV - Site Visit"
  ,"GSTV - Showcase"
  ,"GSTV - Nielsen Survey"
  ,"GSTV - Research Survey"
  ,"GSTV - Unsellable"
]

export function flagsListReducer(state, action){
	state = state || intialflagsList;
  //For future action handling
  return state;
}
