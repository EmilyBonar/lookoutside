//var classNames = require("classnames");

function LocationInput(props) {
	return (
		<div className={"flex flex-col sm:flex-row"}>
			<input
				size="1"
				className={"mt-4 mx-2 rounded flex-grow h-20 text-4xl pl-2"}
			/>
			<button
				className="bg-white rounded p-2 h-20 w-40 mt-4 mr-2 text-4xl uppercase hover:bg-gray-300 self-center"
				onClick={() => {
					props.onSubmit(document.querySelector("input").value);
				}}
			>
				Submit
			</button>
		</div>
	);
}

export default LocationInput;
