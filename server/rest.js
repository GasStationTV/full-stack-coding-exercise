const express = require('express')
const fs = require('fs')
const app = express()
const MongoClient = require('mongodb').MongoClient

var db

// A little forethought for security.
var dbConnectionStr = fs.readFileSync(__dirname+'/dbconnection', 'utf8')

// Don't start the REST server until verifying the DB connection.
MongoClient.connect(dbConnectionStr, (err, database) => {
	
	if (err) return console.log(err)
	
	db = database
	
	app.listen(3000, () => {
		console.log('listening on 3000')
	})
})

app.get('/', function (req, res) {
	res.send('Hello World!')
})

app.get('/populate_sites_collection', (req, res) => {

	var initialSiteCollection = [
		{ name: "Site 1", flags:[] },
		{ name: "Site 2", flags:[] },
		{ name: "Site 3", flags:[] },
		{ name: "Site 4", flags:[] },
		{ name: "Site 5", flags:[] },
		{ name: "Site 6", flags:[] },
		{ name: "Site 7", flags:[] },
		{ name: "Site 8", flags:[] },
		{ name: "Site 9", flags:[] },
		{ name: "Site 10", flags:[] },
		{ name: "Site 11", flags:[] },
		{ name: "Site 12", flags:[] },
		{ name: "Site 13", flags:[] },
		{ name: "Site 14", flags:[] },
		{ name: "Site 15", flags:[] },
		{ name: "Site 16", flags:[] },
		{ name: "Site 17", flags:[] },
		{ name: "Site 18", flags:[] },
		{ name: "Site 19", flags:[] },
		{ name: "Site 20", flags:[] },
		{ name: "Site 21", flags:[] },
		{ name: "Site 22", flags:[] },
		{ name: "Site 23", flags:[] },
		{ name: "Site 24", flags:[] }
	]

	db.collection('sites').remove({}, (err, result) => {

		if (err) return console.log("Unable to Drop Collection", err)

		db.collection('sites').insertMany(initialSiteCollection, (err, result) => {

			if (err) return console.log("Unable to insert collection", err)

			console.log('Sites Collection saved to MongoDB')

			res.send('Collection Saved')
		})
	})

})