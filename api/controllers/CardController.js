/**
 * CardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  new: function (req, res) {
    CardType.find({}).exec(function cardTypes(err, types) {
      if (err) console.log(err);

      Iteration.findOne({ board: req.param("id") }).exec(
        function iterationFound(err, iteration) {
          if (err) console.log(err);

          res.view({
            boardID: req.param("id"),
            cardTypes: types,
            iteration: iteration
          });
        }
      );
    });
  },

  create: function (req, res, next) {
    Card.create(req.params.all(), function cardCreated(err, card) {
      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        };

        return res.redirect("/card/new");
      }
      console.log("card created");
      res.json(card);
    });
  },

  allCards: function (req, res, next) {
    Card.find()
      .sort({
        column: 1,
        row: 1
      })
      .exec(function (err, cards) {
        if (err) return next(err);

        if (!cards) return next();

        res.json({
          cards: cards
        });
      });
  },

  update: function (req, res, next) {
    var Cards = req.param("Cards");
    if (Cards != null) {
      Cards.forEach(element => {
        Card.findOne({ id: element.id }).exec(function (err, card) {
          //Check the iteration of the card, if it is null then the card
          //has arrived from the draft location
          //Which means we need to null the draft value and reassign the iteration
          if (card.iteration == null) {
            Card.update(
              element.id,
              {
                column: element.column,
                row: element.row,
                cardType: element.cardType,
                draft: null,
                iteration: element.iteration
              },
              function cardUpdated(err) {
                if (err) {
                  console.log(err);
                }
              }
            );
          } else {
            Card.update(
              element.id,
              {
                column: element.column,
                row: element.row,
                cardType: element.cardType,
              },
              function cardUpdated(err) {
                if (err) {
                  console.log(err);
                }
              }
            );
          }
        });
      });

      // Card.publishUpdate(
      //   Cards[0].id,
      //   {
      //     verb: "updated"
      //   },
      //   req
      // );
      return res.send(200);
    }
  },

  makeDraft: function(req, res, next) {
    Card.update({
      id: req.param('id')
    }).set({
      iteration: null,
      draft: req.param('draft'),
      cardType: 'Draft'
    }).exec(function(err) {
      if (err) next(err);

      return res.send(200);
    })
  },

  subscribe: function (req, res, next) {
    Card.find(function foundUser(err, cards) {
      if (err) next(err);
      // User.subscribe(req.socket);
      Card.subscribe(req.socket, cards);
      res.send(200, cards);
    });
  },

  headers: function (req, res, next) {
    Card.find({
      iteration: req.param("id"),
      cardType: "Header"
    })
      .sort({
        row: 1,
        column: 1
      })
      .exec(function (err, cards) {
        if (err) next(err);

        res.json(cards);
      });
  },

  stories: function (req, res, next) {
    Card.find({
      iteration: req.param("id"),
      cardType: "Story"
    })
      .sort({
        column: 1,
        row: 1
      })
      .exec(function (err, cards) {
        if (err) next(err);

        res.json(cards);
      });
  },

  delete: function (req, res, next) {
    console.log(req.params.all());
    Card.destroy({
      id: req.param("id")
    }).exec(function (err) {
      if (err) next(err);

      console.log("destroyed");
      res.send(200);
    });
  },

  edit: function (req, res, next) {
    Card.update(
      {
        id: req.param("id")
      },
      {
        title: req.param('title'),
        description: req.param('description'),
      }).exec(function (err) {
        if (err) next(err);

        return res.send(200);
      })
  }
};
