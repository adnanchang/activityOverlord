/**
 * DraftController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    create: function (req, res, next) {
        Draft.create(req.params.all()).exec(function draftCreated(err, draft) {
            if (err) next(err);

            return res.json(draft);
        })
    },

    getDraft: function (req, res, next) {
        Draft.findOne({ board: req.param('id') }).populate('cards')
        .exec(function (err, draft) {
            if (err) next(err);

            return res.json(draft);
        })
    }

};

