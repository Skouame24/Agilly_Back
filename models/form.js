'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Form extends Model {
    static associate(models) {
      Form.belongsTo(models.User, { foreignKey: 'userId' });
      Form.hasMany(models.Questionnaire, { foreignKey: 'formId' })
      Form.hasMany(models.Campagne, { foreignKey: 'formId' })

    }
  }

  Form.init({
    nom: DataTypes.STRING,
    description: DataTypes.STRING,
    slug: DataTypes.STRING,
    userId: DataTypes.INTEGER 
  }, {
    sequelize,
    modelName: 'Form',
  });

  return Form;
};
