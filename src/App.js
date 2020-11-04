import React from "react";
import Card from "./Card";
import "./App.css";
import LocationInput from "./LocationInput";
var classNames = require("classnames");

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			splashScreen: true,
			location: null,
			geo: null,
			weather: null,
			covid: null,
		};
		this.fetchLocation = this.fetchLocation.bind(this);
	}
	getCounty(address_components) {
		return address_components
			.filter((element) =>
				element.types.includes("administrative_area_level_2"),
			)[0]
			.long_name.replace(/( County)?( Parish)?/g, "")
			.replaceAll(" ", "+");
	}

	async fetchCovidData() {
		let data = await fetch(
			`./.netlify/functions/getCovidData?county=${this.getCounty(
				this.state.geo.address_components,
			)}`,
		)
			.then((res) => res.json())
			.then((data) => {
				return data;
			});
		//console.log(data);
		this.setState({ covid: data });
	}

	async fetchWeatherData() {
		let data = await fetch(
			`./.netlify/functions/getWeatherData?lat=${this.state.geo.geometry.location.lat}&lon=${this.state.geo.geometry.location.lng}`,
		)
			.then((res) => res.json())
			.then((data) => {
				return data;
			});
		//console.log(data);
		this.setState({ weather: data });
	}

	async fetchLocation(value) {
		if (value !== "") {
			this.setState({ splashScreen: false, location: value });
			let data = await fetch(
				`./.netlify/functions/getLocationData?loc=${value}`,
			)
				.then((res) => res.json())
				.then((data) => {
					return data;
				});
			this.setState({ geo: data });
			this.fetchCovidData();
			this.fetchWeatherData();
		} else {
			this.setState({ splashScreen: true });
		}
	}

	render() {
		return (
			<div
				className={classNames("flex flex-col", {
					"h-screen": this.state.splashScreen,
					"justify-center": this.state.splashScreen,
				})}
			>
				<LocationInput onSubmit={this.fetchLocation} />
				<div
					className={classNames(
						"w-full h-full inset-auto grid gap-2 grid-cols-1 mt-2 md:grid-cols-2",
						{ hidden: this.state.splashScreen },
					)}
				>
					<Card covidData={this.state.covid} />
					<Card weatherData={this.state.weather} />
				</div>
			</div>
		);
	}
}

export default App;
