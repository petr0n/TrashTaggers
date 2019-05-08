module.exports = function(sequelize, DataTypes) {
  var Event = sequelize.define("Event", {
    eventTitle: {
      type: DataTypes.STRING
    },
    eventLocation: {
      type: DataTypes.STRING
    },
    eventDesc: {
      type: DataTypes.TEXT
    },
    eventDateTime: {
      type: DataTypes.DATETIME
    },
    byob: {
      type: DataTypes.BOOLEAN
    },
    userId: {
      type: DataTypes.INTEGER
    }
  });

  Event.associate = function(models) {
    Event.hasOne(models.User, {
      onDelete: "cascade"
    });
  };

  return Event;
};
