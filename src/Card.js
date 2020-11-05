import React from "react";
import Weather from "./Weather";
import Covid from "./Covid";
var classNames = require("classnames");

function Card(props) {
	const cardClasses = classNames(
		"grid mx-4 bg-gray-100 rounded-md shadow-inner pt-5",
	);
	let content = <h1>Not a valid card option</h1>;
	if (props.hidden === false) {
		if ("weatherData" in props) {
			content = <Weather data={props.weatherData} />;
		} else if ("covidData" in props) {
			content = <Covid data={props.covidData} location={props.location} />;
		}
	}
	return <div className={cardClasses}>{content}</div>;
}

export default Card;
