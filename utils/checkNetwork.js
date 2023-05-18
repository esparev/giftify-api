/**
 * Checks the network of the card number.
 * @param {string} cardNumber
 * @returns {string} network
 */
function checkNetwork(cardNumber) {
	switch (cardNumber[0]) {
		case '3':
			return 'American Express';
		case '4':
			return 'Visa';
		case '5':
			return 'MasterCard';
		default:
			return 'Unknown';
	}
}

module.exports = checkNetwork;
