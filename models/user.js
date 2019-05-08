module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define("User", {
        fullName: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        googleIdToken: {
            type: DataTypes.string
        }
    });

    User.associate = function(models) {
        User.hasMany(models.Event, {
        onDelete: "cascade"
    });
};