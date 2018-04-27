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
    Board.create(req.params.all(), function boardCreated(err, board) {
      if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        };

        return res.redirect("/board/new");
      }

      res.json(board);
    });
  },

  list: function(req, res, next) {
    Board.find({}).exec(function(err, boards) {
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
    Board.findOne({
      id: req.param('id')
    }, function boardFound(err, board) {
      if (err) {
        console.log(err);
        return res.redirect('/');
      }
      console.log(board);
      res.view({
        board: board
      });
    })
  }

};

