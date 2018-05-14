/**
 * Draft.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    //An iteration contains a collection of cards
    cards: {
      collection: "card",
      via: "iteration"
    },

    //An iteration belongs to a board
    board: {
      model: "board"
    }
  }
};
