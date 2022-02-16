const { getById, getByVin } = require('./cars-model');
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
	// DO YOUR MAGIC
	try {
		const { id } = req.params;
		getById(id).then((car) => {
			if (car) {
				req.car = car;
				next();
			} else {
				res.status(404).json({ message: 'car with id <car id> is not found' });
			}
		});
	} catch (err) {
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

const checkCarPayload = async (req, res, next) => {
	// DO YOUR MAGIC
	try {
		const { vin, make, model, mileage } = req.body;
		if (vin === undefined) {
			res.status(400).json({ message: `vin is missing` });
		} else if (make === undefined) {
			res.status(400).json({ message: `make is missing` });
		} else if (model === undefined) {
			res.status(400).json({ message: `model is missing` });
		} else if (mileage === undefined) {
			res.status(400).json({ message: `mileage is missing` });
		} else {
			req.car = req.body;
			next();
		}
	} catch (err) {
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

const checkVinNumberValid = async (req, res, next) => {
	// DO YOUR MAGIC
	try {
		const { vin } = req.body;
		const isValid = vinValidator.validate(vin);

		if (isValid) {
			next();
		} else {
			res.status(400).json({ message: `vin ${vin} is invalid` });
		}
	} catch (err) {
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

const checkVinNumberUnique = async (req, res, next) => {
	// DO YOUR MAGIC
	try {
		const { vin } = req.body;
		const existing = await getByVin(vin);
		if (!existing) {
			next();
		} else {
			res.status(400).json({ message: `vin ${vin} already exists` });
		}
	} catch (err) {
		res.status(500).json({ message: 'Internal Server Error' });
	}
};

module.exports = {
	checkCarId,
	checkCarPayload,
	checkVinNumberValid,
	checkVinNumberUnique,
};
