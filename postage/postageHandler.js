function handlePostage(request, response) {
	console.log("Handling Postage Request");

	var weight = request.query.weight;
	var type = request.query.type;
	var pCalculated = postageCalculated(weight, type);

	var params = {
		weight: weight,
		type: type,
		pCalculated : pCalculated
	};

	response.render("pages/result", params);
}

function postageCalculated(weight, type) {
	var result = 0;
	switch (type) {
		case "metered":
			result = calculateMetered(weight);
			break;
		case "stamped":
			result = calculateStamped(weight);
			break;
		case "flats":
			result = calculateFlats(weight);
			break;
		case "parcels":
			result = calculateParcels(weight);
			break;
		}

	return result;
}


function calculateStamped(weight) {
	var total = 0.49;
	var floatWeight = parseFloat(weight);

	if (weight <= 3.5 && weight > 1) {
		for (var i = 1; i < weight; i++)
			total += 0.21;
	} else if (weight > 3.5)
		total = 1.12;	

	return Math.round(total * 100) / 100;
}

function calculateMetered(weight) {
	var total = 0.46;
	var floatWeight = parseFloat(weight);

	if (weight <= 3.5 && weight > 1) {
		for (var i = 1; i < weight; i++)
			total += 0.21;
	} else if (weight > 3.5)
		total = 1.09;	

	return Math.round(total * 100) / 100;
}

function calculateFlats(weight) {
	var total = 0.98;
	var floatWeight = parseFloat(weight);
	for (var i = 1; i < weight; i++)
			total += 0.21;

	return Math.round(total * 100) / 100;
}

function calculateParcels(weight) {
	var total = 2.67;
	var floatWeight = parseFloat(weight);
	for (var i = 4; i < weight; i++)
			total += 0.18;

	return Math.round(total * 100) / 100;
}

module.exports = {handlePostage: handlePostage};