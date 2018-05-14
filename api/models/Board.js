/**
 * Board.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    //A board consists of multiple iterations
    iterations: {
      collection: 'iteration',
      via: 'board'
    },

    //A board consists of a draft
    drafts: {
      collection: 'draft',
      via: 'board'
    }
  },

};

