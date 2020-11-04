function Covid(props) {
	try {
		let county = props.data.county;
		let state = props.data.province;
		let data = props.data.timeline;
		let cases = Object.values(data.cases);
		//console.log(cases);
		//if (data !== [] && data !== null && data !== undefined) {
		return (
			<div className="text-center">
				<h2 className="text-xl ">
					Last daily infection count in{" "}
					<span className="capitalize">
						{county} County, {state}
					</span>
				</h2>
				<h1 className="font-bold text-5xl">
					{cases[cases.length - 1] - cases[cases.length - 2]}
				</h1>
				<h3>
					Daily cases
					{isIncreasing(cases)
						? " are increasing, be careful!"
						: isIncreasing(cases) === false
						? " are decreasing, good job!"
						: " have been holding steady"}
				</h3>
			</div>
		);
	} catch (err) {
		console.log(err);
		return null;
	}
}

function isIncreasing(data) {
	let cases = data.map((el) => el.cases);
	let lastHalf = cases.slice(cases.length / 2 + 1);
	let totalAvg = cases.reduce((a, b) => a + b, 0) / cases.length;
	let lastAvg = lastHalf.reduce((a, b) => a + b, 0) / lastHalf.length;
	if (lastAvg / totalAvg > 1.01) {
		return true;
	} else if (lastAvg / totalAvg < 0.99) {
		return false;
	} else {
		return null;
	}
}

export default Covid;
