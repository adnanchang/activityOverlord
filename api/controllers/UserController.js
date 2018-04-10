/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    'new': function (req, res) {
        res.view();
    },

    'create': function (req, res, next) {
        console.log('in the create function');
        // req.params.online = true;
        User.create(req.params.all(), function userCreated(err, user) {
            if (err) {
                console.log(err);
                req.session.flash = {
                    err: err
                }

                return res.redirect('/user/new');
            }

            // res.json(user);
            //Log in user automatically
            console.log("User created");
            console.log(user);
            req.session.authenticated = true;
            req.session.User = user;
            res.redirect('/user/show/' + user.id);
        })
    },

    'show': function (req, res, next) {
        User.findOne(req.param('id'), function foundUser(err, user) {
            if (err) return next(err);

            if (!user) return next();

            res.view({
                user: user
            });
        })
    },

    'index': function (req, res, next) {

        User.find(function foundUser(err, users) {
            if (err) return next(err);

            if (!users) return next();

            res.view({
                users: users
            });
        })
    },

    'edit': function (req, res, next) {
        User.findOne(req.param('id'), function foundUser(err, user) {
            if (err) {
                console.log(err);
                req.session.flash = {
                    err: err
                }

                return res.redirect('/user');
            }

            if (!user) {
                console.log(err);
                req.session.flash = {
                    err: err
                }

                return res.redirect('/user');
            }


            res.view({
                user: user
            });
        })
    },

    'update': function (req, res, next) {
        User.update(req.param('id'), req.params.all(), function userUpdated(err) {
            if (err) {
                res.redirect('/user/edit/' + req.param('id'));
            }

            res.redirect('/user/show/' + req.param('id'));
        })
    },

    'destroy': function (req, res, next) {
        User.findOne(req.param('id'), function foundUser(err, user) {
            if (err) return next(err);

            if (!user) return next();

            User.destroy(user.id, function destroyedUser(err) {
                if (err) return next(err);
            })
            res.redirect('/user');
        })
    },

    subscribe: function (req, res, next) {
        User.find(function foundUser(err, users) {
            if (err) next(err);
            // User.subscribe(req.socket);
            User.subscribe(req.socket, users);
            res.send(200, users);
        });

    },

    'updateUserStatus': function(req, res, next) {
        User.update(req.param('id'), { online: req.param('loggedIn') }, function userUpdated(err) {
            if (err) {
                res.redirect('/user/edit/' + req.param('id'));
            }

            res.redirect('/user/show/' + req.param('id'));
        });
    }
};

