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
	return User;
};