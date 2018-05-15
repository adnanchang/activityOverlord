/**
 * IterationController
 *
 * @description :: Server-side logic for managing iterations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  allIterations: function(req, res, next) {
    Iteration.find({ board: req.param("id") }).exec(function(err, iterations) {
      if (err) console.log(err);

      res.json(iterations);
    });
  },

  delete: function(req, res, next) {
    Iteration.destroy({ id: req.param("id") }).exec(function(err) {
      if (err) next(err);

      return res.send(200);
    });
  },

  create: function(req, res, next) {
    console.log(req.params.all());
    Iteration.create({
      headerRows: 1,
      headerColumns: 5,
      storyColumns: 5,
      board: req.param("id")
    }).exec(function(err, iteration) {
      if (err) next(err);

      return res.send(200);
    });
  },

  addColumn: function(req, res, next) {
    Iteration.findOne({ id: req.param("id") }).exec(function(err, iteration) {
      if (err) next(err);

      iteration.headerColumns++;
      iteration.storyColumns++;
      iteration.save(function(err) {
        if (err) next(err);
      });

      return res.send(200);
    });
  },

  addHeader: function(req, res, next) {
    Iteration.findOne({ id: req.param("id") }).exec(function(err, iteration) {
      if (err) next(err);

      iteration.headerRows++;
      iteration.save(function(err) {
        if (err) next(err);
      });

      return res.send(200);
    });
  },

  removeColumn: function(req, res, next) {
    Iteration.findOne({ id: req.param("id") }).exec(function(err, iteration) {
      if (err) next(err);

      if (iteration.headerColumns > 5) {
        Card.find({
          iteration: iteration.id,
          column: iteration.headerColumns
        }).exec(function(err, cards){
          cards.forEach(card => {
            console.log(card);
            card.cardType = "Draft";
            card.save(function(err) {
              if (err) next(err);
            });
          });
        })

        iteration.headerColumns--;
        iteration.storyColumns--;

        iteration.save(function(err) {
          if (err) next(err);
        });

        return res.send(200);
      } else {
        return res.send(500, { error: "You cannot have less than 5 columns" });
      }
    });
  },

  removeHeader: function(req, res, next) {
    Iteration.findOne({ id: req.param("id") }).exec(function(err, iteration) {
      if (err) next(err);

      if (iteration.headerRows > 1) {
        Card.find({
          iteration: iteration.id,
          cardType: "Header",
          row: iteration.headerRows
        }).exec(function(err, cards) {
          cards.forEach(card => {
            console.log(card);
            card.cardType = "Draft";
            card.save(function(err) {
              if (err) next(err);
            });
          });

          iteration.headerRows--;
          iteration.save(function(err) {
            if (err) next(err);
          });

          return res.send(200);
        });
      } else {
        return res.send(500, { error: "Cannot have less than 1 header" });
      }
    });
  }
};
