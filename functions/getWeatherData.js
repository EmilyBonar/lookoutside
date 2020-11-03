const axios = require("axios");
require("dotenv").config();

exports.handler = async (event, context) => {
	const lat = event.queryStringParameters.lat;
	const lon = event.queryStringParameters.lon;
	const weatherKey = process.env.weatherKey;
	const responseData = await axios
		.get(
			`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${weatherKey}`,
		)
		.then((response) => {
			return response.data;
		});
	console.log(responseData);
	return {
		statusCode: 200,
		body: JSON.stringify(responseData),
	};
};
