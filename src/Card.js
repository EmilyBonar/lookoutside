import React from "react";
import Weather from "./Weather";
import Covid from "./Covid";
var classNames = require("classnames");

function Card(props) {
	const cardClasses = classNames(
		"grid h-40 mx-4 bg-gray-100 rounded-md shadow-inner p-10",
	);
	let content = <h1>Not a valid card option</h1>;
	if ("weatherData" in props) {
		content = <Weather data={props.weatherData} />;
	} else if ("covidData" in props) {
		content = <Covid data={props.covidData} />;
	}
	return <div className={cardClasses}>{content}</div>;
}

export default Card;
