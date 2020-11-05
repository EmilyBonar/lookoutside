//var classNames = require("classnames");
import logo from "./logo.svg";

function LocationInput(props) {
	return (
		<>
			<img src={logo} alt="" className="h-12 m-4 mb-0" />
			<form
				className={"flex flex-col sm:flex-row"}
				onSubmit={(e) => {
					e.preventDefault();
					props.onSubmit(e.target[0].value);
				}}
			>
				<input
					size="1"
					placeholder="Zip code or address"
					className={"mt-4 mx-2 rounded-lg flex-grow h-20 text-4xl pl-2"}
				/>
				<button
					type="submit"
					className="bg-white rounded-lg p-2 h-20 w-40 mt-4 mx-2 text-4xl uppercase hover:bg-gray-300 self-center"
				>
					Submit
				</button>
			</form>
		</>
	);
}

export default LocationInput;
