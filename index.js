'use strict';


global.isVerbose = process.argv.includes('--verbose')
if( isVerbose )
	console.log("\tRunning in verbose mode\n")

require('./extensions')

const readline = require('readline');
const fs = require('fs');
const Route = require('./route')

const topSecretAlgorithm = (addresses, drivers) => {
	/*	Calculates all possible assignations and suitability scores*/

	let routes = []

	for( let i = 0 ; i < drivers.length ; i++ )
		for( let j = 0 ; j < addresses.length ; j++ ) {
			let route = new Route(addresses[ j ], drivers[ i ])
			route.calculateSuitabilityScore()

			if( isVerbose )
				console.log( '\x1b[32m%s\x1b[0m', `Possible route added => \n\t${route.toString()}` )

			routes.push( route )
		}


	// Gets all possible itinieraries from all possible assignations (driver -> address)
	let itineraries = []
	for( let i = 0 ; i < routes.length ; i++ ){

		if( isVerbose )
			console.log('\n\n\n')

		let selectedRoutes = []
		let tmpRoutes = [...routes] // Creates a copy of the original array, this copy will be modified as the algorithm works. It's reset after each iteration
		tmpRoutes = removeRouteFromRoutes(routes[ i ], tmpRoutes)

		selectedRoutes.push(routes[ i ]) // Adds current route in the iteration as the first route in the itinerary

		selectedRoutes = selectedRoutes.concat(findTotalSuitabilityScore(tmpRoutes, [], 0)) // Build final array with all routes

		if( isVerbose ){
			console.log( '\x1b[32m%s\x1b[0m', `Final Itinerary => \n\t${selectedRoutes}` )
			console.log( '\x1b[34m%s\x1b[0m', `\t\tTotal SS => ${selectedRoutes.reduce((totalSuitabilityScore, route) => totalSuitabilityScore + route.getSuitabilityScore(), 0)}\n` )
		}

		itineraries.push( selectedRoutes )
	}

	// Sorts all calculated itineraries according to their total suitability score
	itineraries = itineraries.sort((i1, i2) => {
		// Gets total suitability score for the first itinerary
		let totalSuitabilityScoreI1 = i1.reduce((totalSuitabilityScore, route) => totalSuitabilityScore + route.getSuitabilityScore(), 0)
		// Gets total suitability score for the second itinerary
		let totalSuitabilityScoreI2 = i2.reduce((totalSuitabilityScore, route) => totalSuitabilityScore + route.getSuitabilityScore(), 0)

		return totalSuitabilityScoreI1 > totalSuitabilityScoreI2 ? -1 : 1
	})

	if( isVerbose ){
		console.log('\x1b[31m%s\x1b[0m', `\nWorst assignation:`) // First tinerary in the array is the one with the highest total suitability score
		itineraries[itineraries.length - 1].forEach(route => {
			console.log('\x1b[31m%s\x1b[0m', `\t${route.getDriver()} -> ${route.getAddress()}`)
		})
		console.log('\x1b[31m%s\x1b[0m', `\t\tTotal Suitability Score => ${itineraries[itineraries.length - 1].reduce((totalSuitabilityScore, route) => totalSuitabilityScore + route.getSuitabilityScore(), 0)}`) // First itinerary in the array is the one with the highest total suitability score
	}

	console.log('\x1b[32m%s\x1b[0m', `\nBest assignation:`) // First tinerary in the array is the one with the highest total suitability score
	itineraries[0].forEach(route => {
		console.log('\x1b[32m%s\x1b[0m', `\t${route.getDriver()} -> ${route.getAddress()}`)
	})
	console.log('\x1b[34m%s\x1b[0m', `\t\tTotal Suitability Score => ${itineraries[0].reduce((totalSuitabilityScore, route) => totalSuitabilityScore + route.getSuitabilityScore(), 0)}`) // First itinerary in the array is the one with the highest total suitability score




}

// Recursive function used to calculate all total SS's from all posible assignations (driver => address)
const findTotalSuitabilityScore = (routes, selectedRoutes, totalSuitabilityScore) => {

	if( routes.length == 0)
		return selectedRoutes
	else {

		selectedRoutes.push(routes[ 0 ]) // Adds first available route to the selected routes for the final itinerary

		if( isVerbose )
			console.log(`\nAvailable routes to process: ${routes}\n\tAdded route to the Itinerary: ${routes[ 0 ]}`)

		routes = removeRouteFromRoutes(routes[ 0 ], routes)
		return findTotalSuitabilityScore(routes, selectedRoutes )
	}
}

// Removes all routes that contain the driver or address of the given route, so the algorithm can iterate with the rest of the routes
const removeRouteFromRoutes = (route, routes) => {
	return routes.filter(r => r.getAddress() != route.getAddress() && r.getDriver() != route.getDriver() )
}

const main = () => {

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	})


	/*	Asks for the addresses filename */
	rl.question('Enter the name of the file containing the addresses > ', addressesFile => {
		
		/*	Asks for the drivers filename */
		rl.question('Enter the name of the file containing the drivers > ', driversFile => {
			
			try{
				/*	Gets contents and puts inside of arrays. It takes one element per line and removes empty strings and \r characters to prevent data contamination */
				let addresses = fs.readFileSync(`files/${addressesFile || 'addresses.txt'}`, 'utf-8')
					.replace(/\r/g, '')
					.split('\n')
					.filter( address => address !== '')
					.filter( address => address.charAt(0) != '#') // Removes lines starting with #
				let drivers = fs.readFileSync(`files/${driversFile || 'drivers.txt'}`, 'utf-8')
					.replace(/\r/g, '')
					.split('\n')
					.filter( driver => driver !== '')
					.filter( driver => driver.charAt(0) != '#') // Removes lines starting with #
			
				topSecretAlgorithm(addresses, drivers)
			}catch(e) {
				if(e.code == 'ENOENT')
					console.error('\x1b[31m%s\x1b[0m', 'Invalid file name. Please verify that both files exist in the files folder')
				else
					console.error('\x1b[31m%s\x1b[0m', e.message)
			}


			rl.close();
		})
	})
}

main();