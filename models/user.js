module.exports = function (sequelize, DataTypes) {
	let User = sequelize.define("User", {
		fullName: {
			type: DataTypes.STRING
		},
		email: {
			type: DataTypes.STRING
		},
		googleIdToken: {
			type: DataTypes.STRING
		}
	});


	User.associate = function (models) {
		User.hasMany(models.UsersEvents)
	}

	return User;
};