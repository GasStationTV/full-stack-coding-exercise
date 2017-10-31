const flag = [
  { _id: '59f8c72bf78e47a23a3f01d5', type: 'gstv' },
  { _id: '59f8c771f78e47a23a3f01f5', type: 'advertise' },
]

const site = [
  {
    "_id" : "59f40c812539f15bdcd1d0ab",
    "updated_at" : "2017-10-31T18:57:38.940Z",
    "created_at" : "2017-10-28T04:50:09.154Z",
    "address" : "8095 S Rainbow Blvd",
    "city" : "Las Vegas",
    "state" : "NV",
    "zip_code" : "89139",
    "deleted_at" : null,
    "site_flags" : [
        "59f8c7a2883f193d50ef03c6"
    ],
    "__v" : 0
  },
  {
    "_id" : "59f780c6f78e47a23a3e9394",
    "updated_at" : "2017-10-31T18:57:48.831Z",
    "created_at" : "2017-10-28T04:50:09.154Z",
    "address" : "6050 Smoke Ranch Rd",
    "city" : "Las Vegas",
    "state" : "NV",
    "zip_code" : "89108",
    "deleted_at" : null,
    "site_flags" : [
        "59f8c7ac883f193d50ef03c7"
    ],
    "_v" : 0
  }
]

const site_flag = [
  {
    "_id" : "59f8c7a2883f193d50ef03c6",
    "updated_at" : "2017-10-31T18:57:38.919Z",
    "created_at" : "2017-10-31T18:57:38.919Z",
    "flag" : "59f8c771f78e47a23a3f01f5",
    "deleted_at" : null,
    "end_date" : null,
    "start_date" : null,
    "__v" : 0
  },
  {
    "_id" : "59f8c7ac883f193d50ef03c7",
    "updated_at" : "2017-10-31T18:57:48.828Z",
    "created_at" : "2017-10-31T18:57:48.828Z",
    "flag" : "59f8c72bf78e47a23a3f01d5",
    "deleted_at" : null,
    "end_date" : null,
    "start_date" : null,
    "__v" : 0
  }
]

export default {
  flag, site, site_flag
}
