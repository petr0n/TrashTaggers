require('./models/user.js');
const user = {
  serialize: (user, done) => {
    done(null, user.username)
  },
  deserialize: (username, done) => {
    Account.findOne({'googleIdToken': googleIdToken}, function(err, user) {
      done(err, user);
    }
  })
}

module.exports = user;