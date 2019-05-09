module.exports = function (sequelize, DataTypes) {
	let UsersEvents = sequelize.define("UsersEvents", {
		userId: {
			type: DataTypes.INTEGER
		},
		eventId: {
			type: DataTypes.INTEGER
		},
		organizer: {
			type: DataTypes.BOOLEAN,
			default: false
		}
	});
	return UsersEvents;
}
