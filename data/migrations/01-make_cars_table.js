exports.up = function (knex) {
	// DO YOUR MAGIC
	return knex.schema.createTable('cars', (tbl) => {
		tbl.increments();
		tbl.string('vin', 64).unique().notNullable();
		tbl.string('make', 64).notNullable();
		tbl.string('model', 64).notNullable();
		tbl.integer('mileage').notNullable();
		tbl.string('title', 64);
		tbl.string('transmission', 64);
	});
};

exports.down = function (knex) {
	// DO YOUR MAGIC
	return knex.schema.dropTableIfExists('cars');
};
