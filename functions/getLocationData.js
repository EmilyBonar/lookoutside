const axios = require("axios");
require("dotenv").config();

exports.handler = async (event, context) => {
	const location = event.queryStringParameters.loc;
	const geoKey = process.env.geoKey;
	const responseData = await axios
		.get(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${geoKey}`,
		)
		.then((response) => {
			return response.data.results[0];
		});

	return {
		statusCode: 200,
		body: JSON.stringify(responseData),
	};
};
