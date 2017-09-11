// Ideally this would come from ENV variables.
const restBasePath = "http://localhost:3000"

export const URL_SITES_LIST = restBasePath + "/sites"

export const possibleFlagValues = [
		"Advertiser - Location Priority",
		"Retailer - Location Priority",
		"Retailer - Showcase",
		"GSTV - Site Visit",
		"GSTV - Showcase",
		"GSTV - Nielsen Survey",
		"GSTV - Research Survey",
		"GSTV - Unsellable"
	]