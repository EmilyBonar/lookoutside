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
	getCountyAndState(address_components) {
		let county = "";
		let state = "";
		try {
			county = address_components
				.filter((element) =>
					element.types.includes("administrative_area_level_2"),
				)[0]
				.long_name.toLowerCase();
			state = address_components
				.filter((element) =>
					element.types.includes("administrative_area_level_1"),
				)[0]
				.long_name.toLowerCase();
		} catch (err) {
			console.log(err);
		} finally {
			return { county: county, state: state };
		}
	}

	async fetchCovidData() {
		let location = this.getCountyAndState(this.state.geo.address_components);
		let county = location.county.replace(/( county)?( parish)?/g, "");
		let state = location.state;
		let data = await fetch(
			`https://lookoutside.emilybonar.com/.netlify/functions/getCovidData?state=${state}`,
		)
			.then((res) => res.json())
			.then((data) => {
				return data;
			});
		data = data.filter((loc) => {
			return loc.county === county;
		})[0];

		this.setState({ covid: data });
	}

	async fetchWeatherData() {
		let data = await fetch(
			`https://lookoutside.emilybonar.com/.netlify/functions/getWeatherData?lat=${this.state.geo.geometry.location.lat}&lon=${this.state.geo.geometry.location.lng}`,
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
				`https://lookoutside.emilybonar.com/.netlify/functions/getLocationData?loc=${value}`,
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
					<Card
						covidData={this.state.covid}
						location={this.state.geo}
						hidden={this.state.splashScreen}
					/>
					<Card
						weatherData={this.state.weather}
						hidden={this.state.splashScreen}
					/>
				</div>
			</div>
		);
	}
}

export default App;
