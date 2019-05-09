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
      type: DataTypes.DATE
    },
    byob: {
      type: DataTypes.BOOLEAN
    },
    userId: {
      type: DataTypes.INTEGER
    }
  });

  return Event;
};
