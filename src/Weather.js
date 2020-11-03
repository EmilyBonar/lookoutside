import weatherData from "./sample data/sample weather.json";

function Weather() {
	console.log(weatherData);
	return (
		<div className="text-center">
			<h2 className="text-2xl">Current temp</h2>
			<h1 className="font-bold text-5xl">{weatherData.current.temp}°F</h1>
			<h3 className="">Feels like {weatherData.current.feels_like}°F</h3>
		</div>
	);
}
export default Weather;
