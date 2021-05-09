const opencage = require('opencage-api-client');

const getAddress = (lat, lng) => {
	let response = {};
	return opencage
		.geocode({ q: `${lat}, ${lng}`, language: 'en', key: process.env.OCD_API_KEY })
		.then((data) => {
			if (data.status.code == 200) {
				if (data.results.length > 0) {
					var place = data.results[0];
					// console.log(place.formatted);
					// console.log(place.components);
					(response.city = place.components.city),
						(response.country = place.components.country),
						(response.postalCode = place.components.postcode),
						(response.address = place.formatted);
					return response;
				}
			}
			else {
				console.log('error', data.status.message);
			}
		})
		.catch((error) => {
			console.log('error', error.message);
		});
};

module.exports = getAddress;
