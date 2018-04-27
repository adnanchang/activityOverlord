/**
 * CardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  new: function(req, res) {
    res.view({
      boardID: req.param('id')
    });
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
      .sort({
        column: 1,
        row: 1
      })
      .exec(function(err, cards) {
        if (err) return next(err);

        if (!cards) return next();

        res.json({
          cards: cards
        });
      });
  },

  update: function(req, res, next) {
    var Cards = req.param("Cards");
    console.log(Cards);

    if (Cards != null) {
      Cards.forEach(element => {
        Card.update(
          element.id,
          {
            column: element.column,
            row: element.row
          },
          function cardUpdated(err) {
            if (err) {
              console.log(err);
            }
          }
        );
      });

      Card.publishUpdate(
        Cards[0].id,
        {
          verb: "updated"
        },
        req
      );
      res.send(200);
    }
  },

  subscribe: function(req, res, next) {
    Card.find(function foundUser(err, cards) {
      if (err) next(err);
      // User.subscribe(req.socket);
      Card.subscribe(req.socket, cards);
      res.send(200, cards);
    });
  }
};
