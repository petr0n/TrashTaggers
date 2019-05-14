const moment = require("moment");
module.exports = function(sequelize, DataTypes) {
  let Event = sequelize.define("Event", {
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
      type: DataTypes.DATE,
      get: function() {
        return moment(this.getDataValue('DateTime')).format('MMM Do, YYYY')
      }
    },
    byob: {
      type: DataTypes.BOOLEAN
    }
  });

  Event.associate = function (models) {
		Event.hasMany(models.UsersEvents)
  }

  return Event;
};
