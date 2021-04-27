const Sequelize = require('sequelize');
const sequelize = require('../database');

class Level extends Sequelize.Model {}

Level.init(
	{
		name: Sequelize.STRING,
	},
	{
		sequelize,
		tableName: 'level',
	}
);

module.exports = Level;
