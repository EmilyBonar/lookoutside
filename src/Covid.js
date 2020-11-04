import covidData from "./sample data/sample covid.json";

function Covid(props) {
	return (
		<div className="text-center">
			<h2 className="text-xl ">
				Last daily infection count in {covidData[0].county} County,{" "}
				{covidData[0].state}
			</h2>
			<h1 className="font-bold text-5xl">
				{covidData[covidData.length - 1].cases -
					covidData[covidData.length - 2].cases}
			</h1>
			<h3>
				Daily cases
				{isIncreasing(covidData)
					? " are increasing, be careful!"
					: isIncreasing(covidData) === false
					? " are decreasing, good job!"
					: " have been holding steady"}
			</h3>
		</div>
	);
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
