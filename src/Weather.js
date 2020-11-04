import weatherData from "./sample data/sample weather.json";

function Weather(props) {
	if (props.data !== null) {
		return (
			<div className="text-center">
				<h2 className="text-2xl">Current temp</h2>
				<h1 className="font-bold text-5xl">{props.data.current.temp}°F</h1>
				<h3 className="">Feels like {props.data.current.feels_like}°F</h3>
			</div>
		);
	} else {
		return null;
	}
}
export default Weather;
