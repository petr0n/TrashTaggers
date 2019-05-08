module.exports = function (sequelize, DataTypes) {
	let UsersEvents = sequelize.define("UsersEvents", {
		userId: {
			type: Sequelize.INTEGER
		},
		eventId: {
			type: Sequelize.INTEGER
		},
		organizer: {
			type: Sequelize.BOOLEAN,
			default: false
		}
	});
	return UsersEvents;
}

User.belongsToMany(Event, { through: UsersEvents });
Event.belongsToMany(User, { through: UsersEvents });

// user.addProject(project, { through: { role: 'manager' }});
