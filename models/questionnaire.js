'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Questionnaire extends Model {
    static associate(models) {
      Questionnaire.belongsTo(models.Form, { foreignKey: 'formId' });
    }
  }
  Questionnaire.init({
    inputTypes: DataTypes.STRING,
    label: DataTypes.STRING,
    name: DataTypes.STRING,
    formId: DataTypes.INTEGER 
  }, {
    sequelize,
    modelName: 'Questionnaire',
  });
  return Questionnaire;
};