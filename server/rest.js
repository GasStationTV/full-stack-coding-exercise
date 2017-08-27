"use strict"

const express = require('express')
const fs = require('fs')
const app = express()
const MongoClient = require('mongodb').MongoClient
const MongoObjectId = require('mongodb').ObjectID

let db

// Sensitive data like this should come from ENV variables in a real-world application.
let dbConnectionStr = fs.readFileSync(__dirname+'/dbconnection', 'utf8')

// Don't start the REST server until verifying the DB connection.
MongoClient.connect(dbConnectionStr, (err, database) => {
	
	if (err) return console.log(err)
	
	db = database
	
	app.listen(3000, () => {
		console.log('listening on 3000')
	})
})

app.get('/', function (req, res) {
	res.send("Look Maw, I'm on GSTV")
})

// Returns a list of all Site Names and ID's
app.get('/sites', function (req, res) {

	// Only pull out the ID and the name for the list of sites.
	// Let a sub-path download the full "site" document.
	db.collection('sites').find({}, {_id:1, name:1}).toArray((err, result) => {

		if (err) {
			console.log("Unable query the sites Collection", err)
			res.send({error: "Database error."});
			return;
		}

		res.send(result);
	})
})

// Returns a single Site document with any embedded flags.
app.get('/sites/:id', function (req, res) {

	let siteId = MongoObjectId(req.params.id);

	db.collection('sites').findOne({_id: siteId}, (err, result) => {

		if (err) {
			console.log(`Unable get the Site document for ID: ${siteId}`, err)
			res.send({error: "Database error."});
			return;
		}

		if(!result){
			res.status(404);
			res.send({error: "Cannot find a matching document."});
			return;
		}

		res.send(result);
	})
})

// Updates the Site ID with the given Site document.
app.put('/sites/:id', function (req, res) {

	let siteId = MongoObjectId(req.params.id);
	let siteDocument

	try{
		siteDocument = JSON.parse(req.body)
	}
	catch(e){
		console.log(`Unable parse the JSON Site document for updating: ${siteId}`, err)
		res.send({error: "Unable to parse JSON body."});
		return;
	}

	// Ideally Mongoose should be used to validate the Site Document schema, including all of the possible attributes within the 'flags' array.
	if(!Array.isArray(siteDocument.flags))
		return res.send({error: "Cannot update the Site document. The 'flags' property must be of type array."});

	// This API shouldn't let callers modify the Site name or _id.
	let flagsPropertyOnly = Object.assign({}, {"flags":siteDocument.flags}) 

	db.collection('sites').updateOne({_id: siteId}, {$set:JSON.stringify(flagsPropertyOnly)}, {safe:true}, (err, result) => {

		if (err) {
			console.log(`Unable update the Site document for ID: ${siteId}`, err)
			res.send({error: "Database error."});
			return;
		}

		if(result !== 1){
			console.log(`Unable update the Site document for ID: ${siteId}. Mongo returned with an invalid result: ${result}`)
			res.status(404);
			res.send({error: "The update operation failed. The ID is likely invalid."});
			return;
		}

		res.send(result);
	})
})

app.get('/populate_sites_collection', (req, res) => {

	let disabled = true;
	let numberOfDefaultRecords = 24;

	if(disabled){
		res.send('This route has been disabled to prevent accidental data loss. It will drop the collection and insert default records when enabled.')
		return;
	}

	let initialSiteCollection = [];

	for(let i=1; i<=numberOfDefaultRecords; i++)
		initialSiteCollection.push( { name: "Site Name "+i, flags:[] } )

	db.collection('sites').remove({}, (err, result) => {

		if (err) return console.log("Unable to Drop Collection", err)

		db.collection('sites').insertMany(initialSiteCollection, (err, result) => {

			if (err) return console.log("Unable to insert collection", err)

			console.log('Sites Collection saved to MongoDB')

			res.send('Collection Saved')
		})
	})

})