// STRETCH

exports.seed = async function (knex) {
	// Deletes ALL existing entries
	await knex('cars').truncate();
	return knex('cars').insert([
		{
			vin: 'cool',
			make: 'impala',
			model: 'black',
			mileage: 100,
			title: '1967 chevy impala',
			transmission: 'turbo',
		},
		{
			vin: '11111111111111111',
			make: 'tesla',
			model: 'white',
			mileage: 100,
			title: 'alien technology mars',
			transmission: 'the sun',
		},
		{
			vin: 'pretty',
			make: 'prius',
			model: 'pink',
			mileage: 100,
		},
	]);
};
