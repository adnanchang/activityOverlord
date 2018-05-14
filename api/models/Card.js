/**
 * Card.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  schema: true,

  attributes: {

    title: {
      type: 'string',
      required: true
    },

    description: {
      type: 'string',
      required: true
    },

    column: {
      type: 'int',
      required: true
    },

    row: {
      type: 'int',
      required: true
    },

    cardType: {
      type: 'string'
    },

    //Connection to which iteration the card belongs to
    iteration: {
      model: 'iteration'
    },

    draft: {
      model: 'draft'
    }

  },

};

