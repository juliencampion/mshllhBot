'use strict';
module.exports = (sequelize, DataTypes) => {
  var Quotes = sequelize.define('Quotes', {
    description: DataTypes.STRING,
    author: DataTypes.STRING
  }, {});
  Quotes.associate = function(models) {
    // associations can be defined here
  };
  return Quotes;
};
