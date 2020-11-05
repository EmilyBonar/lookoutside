function Weather(props) {
	if (props.data !== null) {
		return (
			<div className="text-center">
				<h2 className="text-2xl">Current Temperature</h2>
				<h1 className="font-bold text-5xl">{props.data.current.temp}°F</h1>
				<h3 className="">
					Feels like{" "}
					<span className="font-bold">{props.data.current.feels_like}°F</span>
				</h3>
				<h2>
					The weather is currently{" "}
					<span className="font-bold">
						{props.data.current.weather[0].description}
					</span>
				</h2>
				<img
					className="mx-auto"
					src={`http://openweathermap.org/img/wn/${props.data.current.weather[0].icon}@2x.png`}
					alt="Current Weather Icon"
				/>
			</div>
		);
	} else {
		return null;
	}
}
export default Weather;
