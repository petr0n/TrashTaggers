UsersEvents = sequelize.define("UsersEvents", {
  userId: Sequelize.INTEGER,
  eventId: Sequelize.INTEGER
});

User.belongsToMany(Event, { through: UsersEvents });
Event.belongsToMany(User, { through: UsersEvents });

// user.addProject(project, { through: { role: 'manager' }});
