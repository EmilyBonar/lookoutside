const axios = require("axios");

exports.handler = async (event, context) => {
	const county = event.queryStringParameters.county;
	const responseData = await axios
		.get(`https://disease.sh/v3/covid-19/nyt/counties/${county}?lastdays=7`)
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
