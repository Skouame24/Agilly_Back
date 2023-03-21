'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Campagne extends Model {
    static associate(models) {
      Campagne.belongsTo(models.Form, { foreignKey: 'formId' });
    }
  }
  Campagne.init({
    campagneReponse: DataTypes.JSON,
    formId: DataTypes.INTEGER 

  }, {
    sequelize,
    modelName: 'Campagne',
  });
  return Campagne;
};