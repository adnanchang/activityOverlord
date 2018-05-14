/**
 * Iteration.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    headerRows: {
      type: 'int'
    },

    headerColumns: {
      type: 'int'
    },

    storyColumns: {
      type: 'int'
    },

    //An iteration contains a collection of cards
    cards: {
      collection: 'card',
      via: 'iteration'
    },

    //An iteration belongs to a board
    board: {
      model: 'board'
    }
  },

  beforeDestroy: function(value, cb) {
    //Destroy all cards associated with this iteration
    console.log(value.where.id);
    Iteration.findOne({ id: value.where.id }).populate('cards').exec(function(err, iteration){
      if (err) return cb(err);

      iteration.cards.forEach(element => {
        Card.destroy({id: element.id}).exec(function(err){
          console.log('Card associated with Iteration ' + element.iteration + ' has been deleted');
        });
      });
      cb();
    });
  }
};

