module.exports = function (sequelize, DataTypes) {
	let UsersEvents = sequelize.define("UsersEvents", {
		// userId: {
		// 	type: DataTypes.INTEGER
		// },
		// eventId: {
		// 	type: DataTypes.INTEGER
		// },
		organizer: {
			type: DataTypes.BOOLEAN,
			default: false
		}
	});

	UsersEvents.associate = function (models) {
		UsersEvents.belongsTo(models.Event); 
		UsersEvents.belongsTo(models.User);
	}

	return UsersEvents;
}
