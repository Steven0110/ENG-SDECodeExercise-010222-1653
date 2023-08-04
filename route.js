class Route {
	constructor(address, driver, suitabilityScore = 0) {
		this.address = address;
		this.driver = driver;
		this.suitabilityScore = suitabilityScore;
	}

	getAddress() {
		return this.address
	}

	getDriver() {
		return this.driver
	}

	calculateSuitabilityScore() {
		if(this.address.length % 2)
			this.suitabilityScore = this.driver.getVowelsNumber() * 1.5
		else
			this.suitabilityScore = this.driver.getConsonantsNumber()

		let addressCommonFactors = this.address.getCommonFactors()
		let driverCommonFactors = this.driver.getCommonFactors()

		if( addressCommonFactors.sharesItem(driverCommonFactors) ){
			this.suitabilityScore *= 1.5 // If address and driver lengths share a common factor, SS is increased by 50%
		}
	}

	getSuitabilityScore() {
		return this.suitabilityScore
	}

	toString() {
		return `Driver: ${this.driver}, Address: ${this.address}, SS: ${this.suitabilityScore}`
	}
}

module.exports = Route