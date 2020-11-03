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

	async getData() {
		let data = await fetch("./.netlify/functions/getCovidData?county=Travis")
			.then((res) => res.json())
			.then((data) => {
				return data;
			});
		console.log("attempt");
		console.log(data);
	}

	fetchLocation(value) {
		if (value !== "") {
			this.setState({ splashScreen: false, location: value });
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
