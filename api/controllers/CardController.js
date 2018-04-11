/**
 * CardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  new: function(req, res) {
    res.view();
  },

  create: function(req, res, next) {
    Card.create(req.params.all(), function cardCreated(err, card) {
      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        };

        return res.redirect("/card/new");
      }

      res.json(card);
    });
  },

  allCards: function(req, res, next) {
    Card.find()
      .sort("column ASC")
      .exec(function(err, cards) {
        if (err) return next(err);

        if (!cards) return next();

        res.json({
          cards: cards
        });
      });
  }
};
