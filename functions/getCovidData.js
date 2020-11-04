const axios = require("axios");

exports.handler = async (event, context) => {
	const state = event.queryStringParameters.state;
	const responseData = await axios
		.get(
			`https://disease.sh/v3/covid-19/historical/usacounties/${state}?lastdays=10`,
		)
		.then((response) => {
			return response.data;
		});
	return {
		statusCode: 200,
		body: JSON.stringify(responseData),
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Headers": "Content-Type",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
		},
	};
};
