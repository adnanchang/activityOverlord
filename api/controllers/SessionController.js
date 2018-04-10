/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt');
module.exports = {
    'new': function (req, res) {
        res.view('session/new');
    },

    create: function (req, res, next) {
        if (!req.param('email') || !req.param('password')) {
            var usernamePasswordRequiredError = [{
                name: 'usernamePasswordRequired',
                message: 'You must enter email and/or password'
            }];
            req.session.flash = {
                err: usernamePasswordRequiredError
            }

            res.redirect('/session/new');
            return;
        }

        User.findOne({ email: req.param('email') }, function (err, user) {
            if (err) return next(err);

            if (!user) {
                var noAccountError = [{
                    name: 'noAccountError',
                    message: 'The email address ' + req.param('email') + ' not found'
                }];
                req.session.flash = {
                    err: noAccountError
                }
                res.redirect('/session/new');
                return;
            }
            bcrypt.compare(req.param('password'), user.encryptedPassword, function (err, valid) {
                if (err) return next(err);

                if (!valid) {
                    var usernamePasswordMismatchError = [{
                        name: 'usernamePasswordMismatchError',
                        message: 'Invalid username and/or password'
                    }];

                    req.session.flash = {
                        err: noAccountError
                    }
                    res.redirect('/session/new');
                    return;
                }

                req.session.authenticated = true;
                req.session.User = user;

                //Changing status to online
                User.update(req.param('id'), { online: true }, function userUpdated(err) {
                    if (err) next(err);

                    console.log(user);
                    //Socket Magic
                    User.publishUpdate(user.id, {
                        loggedIn: true,
                        id: user.id
                    });
                });

                res.redirect('/user/show/' + user.id);
            })
        });
    },

    destroy: function (req, res, next) {
        //Change the status of the user to Offline
        User.findOne(req.param('id'), function(err, user) {
            User.update(user, { online: false }, function userUpdated(err) {
                if (err) {
                    next(err);
                }
                //Socket Magic
                User.publishUpdate(user.id, {
                    loggedIn: false,
                    id: user.id
                });
                req.session.destroy();
                res.redirect('/session/new');
            });
        });
    }
};

