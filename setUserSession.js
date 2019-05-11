'use strict';

module.exports = (req, res, next) => {
  if(!req.user) req.user = {};
  req.user.someData = 'something';

  next();
}