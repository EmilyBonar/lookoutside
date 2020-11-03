import React from "react";
import ReactDOM from "react-dom";

class Card extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return <div className="grid w-40 h-40 bg-gray-100 rounded-md"></div>;
	}
}

export default Card;
