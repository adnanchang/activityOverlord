
module.exports = function(req, res, next) {

    // User is allowed, proceed to the next policy, 
    // or if this is the last policy, the controller
    if (req.session.authenticated && req.session.User.admin) {
      return next();
    }
  
    // User is not allowed
    // (default res.forbidden() behavior can be overridden in `config/403.js`)
    return res.forbidden('You need to be an admin to perform this action.');
  };
  