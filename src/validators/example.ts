const Joi = require('joi');

module.exports = {
  validate: {
    body: {
      name: Joi.string(),
      email: Joi.string(),
    },
  },
};