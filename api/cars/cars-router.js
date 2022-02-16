// DO YOUR MAGIC
const express = require('express');
const router = express.Router();
// Models
const { getAll, create } = require('./cars-model');
// Middleware
const {
	checkCarId,
	checkCarPayload,
	checkVinNumberValid,
	checkVinNumberUnique,
} = require('./cars-middleware');

router.get('/', async (req, res) => {
	try {
		getAll().then((cars) => {
			res.status(200).json(cars);
		});
	} catch (err) {
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

router.get('/:id', checkCarId, async (req, res) => {
	try {
		res.status(200).json(req.car);
	} catch (err) {
		res.status(500).json({ message: 'Internal Server Error' });
	}
});

router.post(
	'/',
	checkCarPayload,
	checkVinNumberValid,
	checkVinNumberUnique,
	async (req, res) => {
		try {
			create(req.car).then((car) => {
				res.status(201).json(car);
			});
		} catch (err) {
			res.status(500).json({ message: 'Internal Server Error' });
		}
	}
);

module.exports = router;
