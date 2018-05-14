/**
 * BoardController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  new: function(req, res) {
    res.view();
  },

  create: function(req, res, next) {
    Board.create({}).exec(function boardCreated(err, board) {
      if (err) {
        console.log(err);
      }

      Iteration.create({ 
        headerRows: 1,
        headerColumns: 10,
        storyColumns: 10,
        board: board.id 
      }).exec(function iterationCreated(
        err,
        iteration
      ) {
        if (err) {
          console.log(err);
        }

        console.log(board);
        res.redirect("/board/list");
      });
    });
  },

  list: function(req, res, next) {
    Board.find({})
      .populate("iterations")
      .exec(function(err, boards) {
        if (err) {
          console.log(err);
          return res.redirect("/board/new");
        }

        res.view({
          boards: boards
        });
      });
  },

  show: function(req, res, next) {
    Board.findOne(
      {
        id: req.param("id")
      },
      function boardFound(err, board) {
        if (err) {
          console.log(err);
          return res.redirect("/");
        }

        CardType.find({}).exec(function (err, cardTypes){
          if (err) next(err);

          return res.view({
            board: board,
            cardTypes: cardTypes
          })
        });
      }
    );
  }
};
