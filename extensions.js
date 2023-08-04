String.prototype.getVowelsNumber = function() {
	let vowels = this.match(/[aeiou]/gi)
	let vowelsCount = vowels ? vowels.length : 0

	if( isVerbose )
		console.log(`\tTotal vowel count for "${this}": ${vowelsCount}`)

	return vowelsCount
}

String.prototype.getConsonantsNumber = function() {
	let consonants = this.match(/[bcdfghjklmnpqrstvwxyz]/gi)
	let consonantsCount = consonants ? consonants.length : 0

	if( isVerbose )
		console.log(`\tTotal consonant count for "${this}": ${consonantsCount}`)

	return consonantsCount
}

String.prototype.getCommonFactors = function() {
	let commonFactors = []

	for( let i = 1 ; i < this.length ; i++ ){
		if( this.length % ( i + 1) === 0)
			commonFactors.push( i + 1 )
	}

	if( isVerbose)
		console.log(`\t\tCommon factors for ${this} with a length of ${this.length} => ${commonFactors}`)

	return commonFactors
}

Array.prototype.sharesItem = function( array ) {
	for( let i = 0 ; i < this.length ; i++ )
		for( let j = 0 ; j < array.length ; j++ )
			if( typeof this[ i ] == 'number' && typeof array[ j ] == 'number' ) //Validates that values to compare are numbers
				if( this[ i ] == array[ j ]){
					if( isVerbose )
						console.log(`\t\t\t${this} and ${array} share at least an item: ${this[ i ]}`)
					return true //	Found a common item
				}

	return false // If code reaches this point, a common item was not found
}