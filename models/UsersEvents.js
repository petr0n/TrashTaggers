module.exports = function (sequelize, DataTypes) {
	let UsersEvents = sequelize.define("UsersEvents", {
		// userId: {
		// 	type: DataTypes.INTEGER
		// },
		eventId: {
			type: DataTypes.INTEGER
		},
		organizer: {
			type: DataTypes.BOOLEAN,
			defaultValue: false
		}
	});

	UsersEvents.associate = function (models) {
		UsersEvents.hasMany(models.Event); 
		UsersEvents.belongsTo(models.User);
	}

	return UsersEvents;
}
